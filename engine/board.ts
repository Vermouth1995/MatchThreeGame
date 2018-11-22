import Item from "./item";
import Cell from "./cell";
import CellAdapter from "./cell/cell_adapter";
import CellOwner from "./cell_owner";
import CellEmpty from "./cell/cell_empty";
import CellBirth from "./cell/cell_birth";
import Polymerize from "./sacrifice/polymerize";
import Explode from "./sacrifice/explode";
import Scrape from "./sacrifice/scrape";
import Click from "./sacrifice/click";
import Exchange from "./sacrifice/exchange";
import OnceLast from "../concept/once/once_last";
import Coordinate from "../concept/coordinate";
import Puzzle from "../render/puzzle";
import BoardPuzzle from "./board_puzzle";
import Render from "../render/render";

export default class Board implements CellOwner {
	private cells: Cell[][];

	private cellsSize: Coordinate = Coordinate.ORIGIN;

	private birthPlace: CellBirth[];

	private puzzle: BoardPuzzle;

	constructor() {
		let self: Board = this;
		this.puzzle = new BoardPuzzle();
		this.puzzle.onBoardClick(function(location: Coordinate) {
			self.click(new Click(location), function() {
				// OnClick
			});
		});
		this.puzzle.onBoardExchange(function(from: Coordinate, to: Coordinate) {
			self.exchange(new Exchange(from, to), function() {
				// OnClick
			});
		});
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	static readonly PUZZLE_CELL_Z_INDEX: number = 10;

	setCells(srcs: Cell[][]) {
		if (srcs == null) {
			srcs = [];
		}
		let rowSize: number = srcs.length;
		let colSize: number = 0;
		for (let i = 0; i < rowSize; i++) {
			let row: Cell[] = srcs[i];
			if (row == null) {
				row = [];
			}
			if (row.length > colSize) {
				colSize = row.length;
			}
		}

		this.cells = [];
		for (let i = 0; i < rowSize; i++) {
			let cellRow: Cell[] = [];
			let srcRow: Cell[] = srcs[i];
			this.cells.push(cellRow);
			for (let j = 0; j < colSize; j++) {
				if (srcRow == null) {
					cellRow.push(CellEmpty.getEmpty());
					continue;
				}
				let src: Cell = srcRow[j];
				if (src == null) {
					cellRow.push(CellEmpty.getEmpty());
					continue;
				}
				cellRow.push(src);
				this.getPuzzle().addChild(src.getPuzzle(), new Coordinate(i, j), Board.PUZZLE_CELL_Z_INDEX);
			}
		}

		this.cellsSize = new Coordinate(rowSize, colSize);
		this.puzzle.setSize(this.cellsSize.swell(CellAdapter.RENDER_SIZE));
	}

	size(): Coordinate {
		return this.cellsSize;
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
		if (
			location.row >= this.cellsSize.row ||
			location.row < 0 ||
			location.col >= this.cellsSize.col ||
			location.col < 0
		) {
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
		let point: Coordinate = this.getLocationOfCell(cell);

		let area: Explode = new Explode(point, size);

		let guests: Coordinate[] = area.getGuests();

		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		for (let i = 0; i < guests.length; ++i) {
			this.getCellByLocation(guests[i]).exploded(end.getCallback());
		}

		this.getCellByLocation(area.getOwner()).exploded(end.getCallback());
	}

	polymerize(area: Polymerize, onEnd: () => void) {
		if (area.getGuests().length == 0) {
			onEnd();
			return;
		}
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let guests: Coordinate[] = area.getGuests();

		for (let i = 0; i < guests.length; ++i) {
			this.getCellByLocation(guests[i]).polymerizedAsGuest(end.getCallback());
		}
		this.getCellByLocation(area.getOwner()).polymerizedAsOwner(guests.length + 1, end.getCallback());
		this.scrape(area.getScrape(), end.getCallback());
	}

	scrape(area: Scrape, onEnd: () => void) {
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let goals: Coordinate[] = area.getGoals();
		for (let i = 0; i < goals.length; ++i) {
			this.getCellByLocation(goals[i]).scraped(end.getCallback());
		}
	}

	click(area: Click, onEnd: () => void) {
		let location: Cell = this.getCellByLocation(area.getLocation());
		location.clicked(onEnd);
	}

	exchange(area: Exchange, onEnd: () => void) {
		let self: Board = this;
		if (area == null || !area.isNeighbor()) {
			onEnd();
			return;
		}
		let fromCell: Cell = this.getCellByLocation(area.getFrom());
		let toCell: Cell = this.getCellByLocation(area.getTo());
		let success: boolean = fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), function() {
			if (!success) {
				onEnd();
				return;
			}
			let polymerize: Polymerize = self.check();
			if (polymerize == null) {
				fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), onEnd);
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
			let area: Polymerize = self.check();
			if (area != null) {
				self.polymerize(area, function() {
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
		let max: Polymerize = null;
		for (let i = 0; i < this.cells.length; i++) {
			let rowCells: Cell[] = this.cells[i];
			for (let j = 0; j < rowCells.length; j++) {
				let location: Coordinate = new Coordinate(i, j);
				let now: Polymerize = this.checkPosition(location);
				if (now == null) {
					continue;
				}
				if (max == null || max.getGuests().length < now.getGuests().length) {
					max = now;
				}
			}
		}
		return max;
	}

	private checkPosition(location: Coordinate): Polymerize {
		let direction: number = 0;
		if (
			!this.getCellByLocation(location)
				.getItem()
				.canPolymerize()
		) {
			return null;
		}

		let guests: Coordinate[] = [];

		let vertical: Coordinate[] = this.checkPositionDirection(location, Coordinate.UP).concat(
			this.checkPositionDirection(location, Coordinate.DOWN)
		);
		let horizontal: Coordinate[] = this.checkPositionDirection(location, Coordinate.LEFT).concat(
			this.checkPositionDirection(location, Coordinate.RIGHT)
		);
		if (vertical.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			guests = guests.concat(vertical);
			direction++;
		}
		if (horizontal.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			guests = guests.concat(horizontal);
			direction++;
		}
		if (direction == 0) {
			return null;
		}

		return new Polymerize(location, guests);
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
				if (exchange != null) {
					return exchange;
				}
			}
		}
		return null;
	}

	private precheckPositon(location: Coordinate): Exchange {
		let cell: Cell = this.getCellByLocation(location);
		if (!cell.canExchange()) {
			return null;
		}
		let item: Item = cell.getItem();
		if (!item.canPolymerize()) {
			return null;
		}
		let cross: Coordinate[] = location.cross();
		for (let i = 0; i < cross.length; i++) {
			if (this.precheckPositonCross(item, cross[i], location)) {
				return new Exchange(location, cross[i]);
			}
		}
		return null;
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

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		onSuccess();
	}
}
