import Cell from "../cell";
import CellBirth from "../cell/cell_birth";

import Coordinate from "../../concept/coordinate";

import BoardCells from "./board_cells";

export default class BoardArrivable {
	constructor(cells: BoardCells, birthPlace: CellBirth[]) {
		this.cells = cells;
		this.birthPlace = birthPlace;
	}

	private cells: BoardCells;

	private birthPlace: CellBirth[];

	private arrivable: boolean[][] = [];

	isArrivable(location: Coordinate): boolean {
		return this.arrivable[location.row][location.col];
	}

	update() {
		this.arrivable = [];
		for (let i = 0; i < this.cells.size().row; i++) {
			this.arrivable.push([]);
			for (let j = 0; j < this.cells.size().col; j++) {
				this.arrivable[i].push(false);
			}
		}
		for (let i = 0; i < this.birthPlace.length; i++) {
			this.updateLocation(this.birthPlace[i].getLocation());
		}
	}

	private updateLocation(location: Coordinate) {
		let cell: Cell = this.cells.getCellByLocation(location);

		if (!cell.canRobbed()) {
			return;
		}

		this.arrivable[location.row][location.col] = true;

		this.updateLocation(location.offset(Coordinate.LEFTDOWN));
		this.updateLocation(location.offset(Coordinate.DOWN));
		this.updateLocation(location.offset(Coordinate.RIGHTDOWN));
	}
}
