import Item from "./item";
import Cell from "./cell";
import CellEmpty from "./cell/cell_empty";
import Coordinate from "./coordinate";
import Render from "./render";
import Birth from "./birth";
import CellOwner from "./cell_owner";
import Polymerize from "./sacrifice/polymerize";
import Explode from "./sacrifice/explode";
import Scrape from "./sacrifice/scrape";

export default class Board implements CellOwner {
	private cells: Cell[][];
	private render: Render;
	private birth: Birth;
	private birthPlace: Coordinate[];

	constructor() {}

	setCells(cells: Cell[][]) {
		this.cells = cells;
	}

	setRender(render: Render) {
		this.render = render;
	}

	setBirth(birth: Birth) {
		this.birth = birth;
	}

	setBirthPlace(place: Coordinate[]) {
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

	explode(cell: Cell, size: number) {
		let explodePoint: Coordinate = this.getLocationOfCell(cell);
		let explodeArea: Explode = new Explode(explodePoint, size);
		for (let i = 0; i < explodeArea.guest.length; ++i) {
			this.getCellByLocation(explodeArea.guest[i]).exploded();
		}
		this.getCellByLocation(explodeArea.owner).exploded();
	}

	polymerize(polymerizeArea: Polymerize) {
		if (polymerizeArea.guest.length == 0) {
			return;
		}
		for (let i = 0; i < polymerizeArea.guest.length; ++i) {
			this.getCellByLocation(polymerizeArea.guest[i]).polymerizedAsGuest();
		}
		this.getCellByLocation(polymerizeArea.owner).polymerizedAsOwner(polymerizeArea.guest.length + 1);
		this.scrape(polymerizeArea.getScrape());
	}

	scrape(scrapeArea: Scrape) {
		for (let i = 0; i < scrapeArea.guest.length; ++i) {
			this.getCellByLocation(scrapeArea.guest[i]).scraped();
		}
	}

	fall(onEnd?: (isChanged: boolean) => void) {}

	static readonly CHECK_NUMBER_SELF: number = 1;
	static readonly CHECK_NUMBER_OK_MINIZE: number = 3;

	check(): Polymerize {
		let maxPolymerize: Polymerize = new Polymerize();

		for (let i = 0; i < this.cells.length; i++) {
			let rowCells: Cell[] = this.cells[i];
			for (let j = 0; j < rowCells.length; j++) {
				let cell: Cell = rowCells[j];
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
}
