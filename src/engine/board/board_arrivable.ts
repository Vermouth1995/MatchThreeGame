import Cell from "../cell/cell";
import CellBirth from "../cell/cell_birth";
import BoardBirths from "../board/board_births";
import Coordinate from "../../concept/coordinate";
import BoardCells from "./board_cells";

export default class BoardArrivable {
	constructor(private cells: BoardCells, private births: BoardBirths) {}

	private arrivable: boolean[][] = [];

	isArrivable(location: Coordinate): boolean {
		if (location.row < 0 || location.row >= this.arrivable.length) {
			return false;
		}
		const row: boolean[] = this.arrivable[location.row];
		if (location.col < 0 || location.col >= row.length) {
			return false;
		}
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

		this.births.iterate((birth: CellBirth) => {
			this.updateLocation(birth.getLocation());
		});
	}

	private updateLocation(location: Coordinate) {
		const cell: Cell = this.cells.getCellByLocation(location);
		if (!cell.canRobbed()) {
			return;
		}

		this.arrivable[location.row][location.col] = true;
		this.updateLocation(location.offset(Coordinate.LEFTDOWN));
		this.updateLocation(location.offset(Coordinate.DOWN));
		this.updateLocation(location.offset(Coordinate.RIGHTDOWN));
	}
}
