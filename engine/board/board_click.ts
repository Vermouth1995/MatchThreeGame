import Cell from "../cell";
import BoardCells from "./board_cells";
import Click from "../sacrifice/click";
import BoardFall from "../board/board_fall";

export default class BoardClick {
	constructor(cells: BoardCells, fall: BoardFall) {
		this.cells = cells;
		this.fall = fall;
	}

	private cells: BoardCells;
	private fall: BoardFall;

	click(area: Click, onEnd: () => void) {
		let self: BoardClick = this;
		let location: Cell = this.cells.getCellByLocation(area.getLocation());
		location.clicked(function() {
			self.fall.start(onEnd);
		});
	}
}
