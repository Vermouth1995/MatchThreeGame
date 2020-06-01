import Coordinate from "../../concept/coordinate";
import Explode from "../sacrifice/explode";
import Cell from "../cell/cell";
import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Once from "../../concept/once/once";

export default class BoardExplode {
	constructor(private cells: BoardCells) {
		this.cells.onExplode((cell: Cell, size: number, onEnd: () => void) => {
			this.explode(cell, size, onEnd);
		});
	}

	private explode(cell: Cell, size: number, onEnd: () => void) {
		const point: Coordinate = this.cells.getLocationOfCell(cell);
		const area: Explode = new Explode(point, size);
		const guests: Coordinate[] = area.getGuests();
		const end: Once = new OnceLast().setCallback(onEnd);

		for (let i = 0; i < guests.length; ++i) {
			this.cells.getCellByLocation(guests[i]).beExploded(end.getCallback());
		}

		this.cells.getCellByLocation(area.getOwner()).beExploded(end.getCallback());
	}
}
