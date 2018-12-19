import Coordinate from "../../concept/coordinate";
import Explode from "../sacrifice/explode";
import Cell from "../cell";
import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Once from "../../concept/once";

export default class BoardExplode {
	constructor(private cells: BoardCells) {
		let self = this;
		this.cells.onExplode(function(cell: Cell, size: number, onEnd: () => void) {
			self.explode(cell, size, onEnd);
		});
	}

	private explode(cell: Cell, size: number, onEnd: () => void) {
		let point: Coordinate = this.cells.getLocationOfCell(cell);

		let area: Explode = new Explode(point, size);

		let guests: Coordinate[] = area.getGuests();

		let end: Once = new OnceLast().setCallback(onEnd);

		for (let i = 0; i < guests.length; ++i) {
			this.cells.getCellByLocation(guests[i]).beExploded(end.getCallback());
		}

		this.cells.getCellByLocation(area.getOwner()).beExploded(end.getCallback());
	}
}
