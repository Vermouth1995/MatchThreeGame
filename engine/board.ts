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
import Locus from "../concept/locus";
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
				// OnExchange
			});
		});
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	static readonly PUZZLE_CELL_Z_INDEX: number = 10;

	static formatCells(cells: Cell[][], size?: Coordinate): Coordinate {
		if (size == null) {
			let rowSize: number = cells.length;
			let colSize: number = 0;
			for (let i = 0; i < rowSize; i++) {
				let row: Cell[] = cells[i];
				if (row != null && row.length > colSize) {
					colSize = row.length;
				}
			}
			size = new Coordinate(rowSize, colSize);
		}
		for (let i = 0; i < size.row; i++) {
			let row: Cell[] = cells[i];
			if (row == null) {
				row = [];
				cells[i] = row;
			}
			for (let j = 0; j < size.col; j++) {
				let col: Cell = row[j];
				if (col == null) {
					row[j] = CellEmpty.getEmpty();
				}
			}
		}

		return size;
	}

	setCells(srcs: Cell[][]) {
		if (srcs == null) {
			srcs = [];
		}
		let size: Coordinate = Board.formatCells(srcs);
		for (let i = 0; i < size.row; i++) {
			let row: Cell[] = srcs[i];
			for (let j = 0; j < size.col; j++) {
				let cell: Cell = row[j];
				this.getPuzzle().addChild(cell.getPuzzle(), new Locus(new Coordinate(i, j)), Board.PUZZLE_CELL_Z_INDEX);
			}
		}
		this.cellsSize = size;
		this.cells = srcs;
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
		return Board.getCellByLocation(this.cells, this.cellsSize, location);
	}

	static getCellByLocation(cells: Cell[][], cellsSize: Coordinate, location: Coordinate): Cell {
		if (location.row >= cellsSize.row || location.row < 0 || location.col >= cellsSize.col || location.col < 0) {
			return CellEmpty.getEmpty();
		}
		return cells[location.row][location.col];
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
		let self: Board = this;
		let location: Cell = this.getCellByLocation(area.getLocation());
		location.clicked(function() {
			self.startFall(onEnd);
		});
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
				self.startFall(onEnd);
			});
		});
	}

	startFall(onNextFallEnd?: () => void) {
		let self: Board = this;
		if (onNextFallEnd != null) {
			this.nextFallEnd.push(onNextFallEnd);
		}
		if (this.isFalling) {
			return;
		}
		this.isFalling = true;
		this.fall(function(isChanged: boolean) {
			let onEnd: (() => void)[] = self.nextFallEnd;
			self.nextFallEnd = [];
			for (let i = 0; i < onEnd.length; i++) {
				onEnd[i]();
			}
			self.isFalling = false;
		});
	}

	private nextFallEnd: (() => void)[] = [];

	private isFalling: boolean = false;

	private fall(onEnd?: (isChanged: boolean) => void) {
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
		for (let i = this.cellsSize.row - 1; i >= 0; i--) {
			for (let j = 0; j < this.cellsSize.col; j++) {
				let location: Coordinate = new Coordinate(i, j);
				let victims: Cell[] = [];
				let victimLocations: Coordinate[] = [];
				this.getVictimsByLocation(location, victims, victimLocations);

				isActive =
					this.getCellByLocation(location).rob(victims, victimLocations, robEnd.getCallback()) || isActive;
			}
		}
	}

	private getVictimsByLocation(location: Coordinate, victims: Cell[], victimLocations: Coordinate[]) {
		for (let i = 0; i < this.birthPlace.length; i++) {
			let cellBirth: CellBirth = this.birthPlace[i];
			let birthLocation: Coordinate = cellBirth.getLocation();

			if (location.equal(birthLocation)) {
				victims.push(cellBirth);
				victimLocations.push(Coordinate.UP);
				return;
			}
		}
		let seeds: Coordinate[] = Coordinate.umbrellaSeed();
		let branchs: Coordinate[] = location.umbrella();
		for (let i = 0; i < seeds.length; i++) {
			let branch: Coordinate = branchs[i];
			victims.push(this.getCellByLocation(branch));
			victimLocations.push(seeds[i]);
		}
	}

	static readonly CHECK_NUMBER_SELF: number = 1;
	static readonly CHECK_NUMBER_OK_MINIZE: number = 3;

	check(): Polymerize {
		return Board.check(this.cells, this.cellsSize);
	}
	static check(cells: Cell[][], cellsSize: Coordinate): Polymerize {
		let max: Polymerize = null;
		let lastCellUpdateTime: number = 0;
		for (let i = 0; i < cells.length; i++) {
			let rowCells: Cell[] = cells[i];
			for (let j = 0; j < rowCells.length; j++) {
				let cell: Cell = rowCells[j];
				let location: Coordinate = new Coordinate(i, j);
				let now: Polymerize = Board.checkPosition(cells, cellsSize, location);
				if (now == null) {
					continue;
				}
				if (
					max == null ||
					max.getGuests().length < now.getGuests().length ||
					(max.getGuests().length == now.getGuests().length && lastCellUpdateTime < cell.getUpdateTime())
				) {
					max = now;
					lastCellUpdateTime = cell.getUpdateTime();
				}
			}
		}
		return max;
	}

	private static checkPosition(cells: Cell[][], cellsSize: Coordinate, location: Coordinate): Polymerize {
		let direction: number = 0;
		if (
			!Board.getCellByLocation(cells, cellsSize, location)
				.getItem()
				.canPolymerize()
		) {
			return null;
		}

		let guests: Coordinate[] = [];

		let vertical: Coordinate[] = Board.checkPositionDirection(cells, cellsSize, location, Coordinate.UP).concat(
			Board.checkPositionDirection(cells, cellsSize, location, Coordinate.DOWN)
		);
		let horizontal: Coordinate[] = Board.checkPositionDirection(cells, cellsSize, location, Coordinate.LEFT).concat(
			Board.checkPositionDirection(cells, cellsSize, location, Coordinate.RIGHT)
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

	private static checkPositionDirection(
		cells: Cell[][],
		cellsSize: Coordinate,
		location: Coordinate,
		direction: Coordinate
	): Coordinate[] {
		let total: Coordinate[] = [];
		let item: Item = Board.getCellByLocation(cells, cellsSize, location).getItem();
		while (true) {
			let directLocation: Coordinate = location.offset(direction);
			if (!item.equals(Board.getCellByLocation(cells, cellsSize, directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}

	precheck(): Exchange {
		return Board.precheck(this.cells, this.cellsSize);
	}

	static precheck(cells: Cell[][], cellsSize: Coordinate): Exchange {
		for (let i = 0; i < cells.length; i++) {
			for (let j = 0; j < cells[i].length; j++) {
				let exchange: Exchange = Board.precheckPositon(cells, cellsSize, new Coordinate(i, j));
				if (exchange != null) {
					return exchange;
				}
			}
		}
		return null;
	}

	private static precheckPositon(cells: Cell[][], cellsSize: Coordinate, location: Coordinate): Exchange {
		let cell: Cell = Board.getCellByLocation(cells, cellsSize, location);
		if (!cell.canExchange()) {
			return null;
		}
		let item: Item = cell.getItem();
		if (!item.canPolymerize()) {
			return null;
		}
		let cross: Coordinate[] = location.cross();
		for (let i = 0; i < cross.length; i++) {
			if (Board.precheckPositonCross(cells, cellsSize, item, cross[i], location)) {
				return new Exchange(location, cross[i]);
			}
		}
		return null;
	}

	private static precheckPositonCross(
		cells: Cell[][],
		cellsSize: Coordinate,
		item: Item,
		location: Coordinate,
		ignore: Coordinate
	): boolean {
		let vertical: Coordinate[] = []
			.concat(Board.precheckPositionDirection(cells, cellsSize, item, location, ignore, Coordinate.UP))
			.concat(Board.precheckPositionDirection(cells, cellsSize, item, location, ignore, Coordinate.DOWN));
		let horizontal: Coordinate[] = []
			.concat(Board.precheckPositionDirection(cells, cellsSize, item, location, ignore, Coordinate.LEFT))
			.concat(Board.precheckPositionDirection(cells, cellsSize, item, location, ignore, Coordinate.RIGHT));
		return (
			vertical.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE ||
			horizontal.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE
		);
	}

	private static precheckPositionDirection(
		cells: Cell[][],
		cellsSize: Coordinate,
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
			if (!item.equals(Board.getCellByLocation(cells, cellsSize, directLocation).getItem())) {
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
