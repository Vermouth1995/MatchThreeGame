import Item from "./item";
import Cell from "./cell";
import CellEmpty from "./cell/cell_empty";
import CellBirth from "./cell/cell_birth";
import Coordinate from "../concept/coordinate";
import EngineRender from "./engine_render";
import CellOwner from "./cell_owner";
import Polymerize from "./sacrifice/polymerize";
import Explode from "./sacrifice/explode";
import Scrape from "./sacrifice/scrape";
import Exchange from "./sacrifice/exchange";
import OnceLast from "../concept/once/once_last";

export default class Board implements CellOwner {
	private cells: Cell[][];
	private render: EngineRender;
	private birthPlace: CellBirth[];

	constructor() {}

	setCells(cells: Cell[][]) {
		this.cells = cells;
	}

	setRender(render: EngineRender) {
		this.render = render;
		this.render.onExchange(function(from: Coordinate, to: Coordinate) {});
	}

	setBirthPlace(place: CellBirth[]) {
		this.birthPlace = place;
	}

	getCellByCellOffset(cell: Cell, offset: Coordinate): Cell {
		return this.getCellByLocation(this.getLocationOfCell(cell).offset(offset));
	}

	getCellByLocationOffset(location: Coordinate, offset: Coordinate): Cell {
		return this.getCellByLocation(location.offset(offset));
	}

	getCellByLocation(location: Coordinate): Cell {
		if (location.row >= this.cells.length) {
			return CellEmpty.getEmpty();
		}
		if (location.col >= this.cells[location.row].length) {
			return CellEmpty.getEmpty();
		}
		return this.cells[location.row][location.col];
	}

	getCellsByLocations(locations: Coordinate[]): Cell[] {
		let victims: Cell[] = [];
		for (let i = 0; i < locations.length; i++) {
			victims.push(this.getCellByLocation(locations[i]));
		}
		return victims;
	}

	getLocationOfCell(cell: Cell): Coordinate {
		for (let i = 0; i < this.cells.length; ++i) {
			for (let j = 0; j < this.cells[i].length; ++j) {
				if (this.cells[i][j] == cell) {
					return new Coordinate(i, j);
				}
			}
		}
		return new Coordinate(0, 0);
	}

	explode(cell: Cell, size: number, onEnd: () => void) {
		let explodePoint: Coordinate = this.getLocationOfCell(cell);
		let explodeArea: Explode = new Explode(explodePoint, size);
		for (let i = 0; i < explodeArea.guest.length; ++i) {
			this.getCellByLocation(explodeArea.guest[i]).exploded(onEnd);
		}
		this.getCellByLocation(explodeArea.owner).exploded(onEnd);
	}

	polymerize(polymerizeArea: Polymerize, onEnd: () => void) {
		if (polymerizeArea.guest.length == 0) {
			onEnd();
			return;
		}
		let polymerizeEnd: OnceLast = new OnceLast();
		polymerizeEnd.setCallback(onEnd);
		for (let i = 0; i < polymerizeArea.guest.length; ++i) {
			this.getCellByLocation(polymerizeArea.guest[i]).polymerizedAsGuest(polymerizeEnd.getCallback());
		}
		this.getCellByLocation(polymerizeArea.owner).polymerizedAsOwner(
			polymerizeArea.guest.length + 1,
			polymerizeEnd.getCallback()
		);
		this.scrape(polymerizeArea.getScrape(), polymerizeEnd.getCallback());
	}

	scrape(scrapeArea: Scrape, onEnd: () => void) {
		for (let i = 0; i < scrapeArea.guest.length; ++i) {
			this.getCellByLocation(scrapeArea.guest[i]).scraped(onEnd);
		}
	}

	exchange(from: Coordinate, to: Coordinate, onEnd: () => void) {
		let self: Board = this;
		if (!from.isNeighbor(to)) {
			onEnd();
			return;
		}
		let fromCell: Cell = this.getCellByLocation(from);
		let toCell: Cell = this.getCellByLocation(to);
		let success: boolean = fromCell.exchange(toCell, function() {
			if (!success) {
				onEnd();
				return;
			}
			let polymerize: Polymerize = self.check();
			if (!polymerize.inNeed()) {
				fromCell.exchange(toCell, onEnd);
				return;
			}
			self.polymerize(polymerize, function() {
				self.fall(function(isChanged: boolean) {
					onEnd();
				});
			});
		});
	}

	fall(onEnd?: (isChanged: boolean) => void) {
		let self: Board = this;
		let isActive: boolean = false;
		let robEnd: OnceLast = new OnceLast();
		robEnd.setCallback(function() {
			if (isActive) {
				self.fall(function(isChanged: boolean) {
					isActive = isActive || isChanged;
					onEnd(isActive);
				});
				return;
			}
			let polymerizeArea: Polymerize = self.check();
			if (polymerizeArea.inNeed()) {
				self.polymerize(polymerizeArea, function() {
					self.fall(onEnd);
				});
				return;
			}
			if (onEnd != null) {
				onEnd(isActive);
			}
		});
		for (let i = this.cells.length - 1; i >= 0; i--) {
			for (let j = 0; j < this.cells[i].length; j++) {
				let location: Coordinate = new Coordinate(i, j);
				isActive =
					isActive ||
					this.getCellByLocation(location).rob(this.getVictimsByLocation(location), robEnd.getCallback());
			}
		}
	}

	private getVictimsByLocation(location: Coordinate): Cell[] {
		for (let i = 0; i < this.birthPlace.length; i++) {
			let cellBirth: CellBirth = this.birthPlace[i];
			if (location.equal(cellBirth.getLocation())) {
				let victims: Cell[] = [];
				victims.push(cellBirth);
				return victims;
			}
		}
		return this.getCellsByLocations(location.umbrella());
	}

	static readonly CHECK_NUMBER_SELF: number = 1;
	static readonly CHECK_NUMBER_OK_MINIZE: number = 3;

	check(): Polymerize {
		let maxPolymerize: Polymerize = new Polymerize();

		for (let i = 0; i < this.cells.length; i++) {
			let rowCells: Cell[] = this.cells[i];
			for (let j = 0; j < rowCells.length; j++) {
				let location: Coordinate = new Coordinate(i, j);
				let nowPolymerize: Polymerize = this.checkPosition(location);
				if (maxPolymerize.guest.length < nowPolymerize.guest.length) {
					maxPolymerize = nowPolymerize;
				}
			}
		}
		return maxPolymerize;
	}

	private checkPosition(location: Coordinate): Polymerize {
		let total: Polymerize = new Polymerize();
		let direction: number = 0;
		if (
			!this.getCellByLocation(location)
				.getItem()
				.canPolymerize()
		) {
			return total;
		}
		let vertical: Coordinate[] = this.checkPositionDirection(location, Coordinate.UP).concat(
			this.checkPositionDirection(location, Coordinate.DOWN)
		);
		let horizontal: Coordinate[] = this.checkPositionDirection(location, Coordinate.LEFT).concat(
			this.checkPositionDirection(location, Coordinate.RIGHT)
		);
		if (vertical.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			total.guest.concat(vertical);
			direction++;
		}
		if (horizontal.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			total.guest.concat(horizontal);
			direction++;
		}
		if (direction != 0) {
			total.owner = location;
		}
		return total;
	}

	private checkPositionDirection(location: Coordinate, direction: Coordinate): Coordinate[] {
		let total: Coordinate[] = [];
		let item: Item = this.getCellByLocation(location).getItem();
		while (true) {
			let directLocation: Coordinate = location.offset(direction);
			if (!item.equals(this.getCellByLocation(directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}

	precheck(): Exchange {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				let exchange: Exchange = this.precheckPositon(new Coordinate(i, j));
				if (exchange.inNeed()) {
					return exchange;
				}
			}
		}
		return new Exchange();
	}

	private precheckPositon(location: Coordinate): Exchange {
		let exchange: Exchange = new Exchange();
		let cell: Cell = this.getCellByLocation(location);
		if (!cell.canExchange()) {
			return exchange;
		}
		let item: Item = cell.getItem();
		if (!item.canPolymerize()) {
			return exchange;
		}
		let cross: Coordinate[] = location.cross();
		for (let i = 0; i < cross.length; i++) {
			if (this.precheckPositonCross(item, cross[i], location)) {
				exchange.setFromTo(location, cross[i]);
				break;
			}
		}
		return exchange;
	}

	private precheckPositonCross(item: Item, location: Coordinate, ignore: Coordinate): boolean {
		let vertical: Coordinate[] = this.precheckPositionDirection(item, location, ignore, Coordinate.UP).concat(
			this.precheckPositionDirection(item, location, ignore, Coordinate.DOWN)
		);
		let horizontal: Coordinate[] = this.precheckPositionDirection(item, location, ignore, Coordinate.LEFT).concat(
			this.precheckPositionDirection(item, location, ignore, Coordinate.RIGHT)
		);
		return (
			vertical.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE ||
			horizontal.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE
		);
	}

	private precheckPositionDirection(
		item: Item,
		location: Coordinate,
		ignore: Coordinate,
		direction: Coordinate
	): Coordinate[] {
		let total: Coordinate[] = [];
		while (true) {
			let directLocation: Coordinate = location.offset(direction);
			if (directLocation.equal(ignore)) {
				break;
			}
			if (!item.equals(this.getCellByLocation(directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}
}
