import Cell from "../cell/cell";
import CellBirth from "../cell/cell_birth";
import BoardBirths from "../board/board_births";
import Coordinate from "../../concept/coordinate/coordinate";
import BoardCells from "./board_cells";
import CoordinateValue from "../../concept/coordinate/coordinate_value";

export default class BoardArrivable {
	constructor(private cells: BoardCells, private births: BoardBirths) {}

	private arrivable: boolean[][] = [];

	isArrivable(location: Coordinate): boolean {
		if (location.getRow() < 0 || location.getRow() >= this.arrivable.length) {
			return false;
		}
		const row: boolean[] = this.arrivable[location.getRow()];
		if (location.getCol() < 0 || location.getCol() >= row.length) {
			return false;
		}
		return this.arrivable[location.getRow()][location.getCol()];
	}

	update() {
		this.arrivable = [];
		for (let i = 0; i < this.cells.size().getRow(); i++) {
			this.arrivable.push([]);
			for (let j = 0; j < this.cells.size().getCol(); j++) {
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

		this.arrivable[location.getRow()][location.getCol()] = true;
		this.updateLocation(location.offset(CoordinateValue.LEFTDOWN));
		this.updateLocation(location.offset(CoordinateValue.DOWN));
		this.updateLocation(location.offset(CoordinateValue.RIGHTDOWN));
	}
}
