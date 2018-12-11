import Cell from "../cell";
import BoardCells from "./board_cells";
import Click from "../sacrifice/click";
import BoardFall from "../board/board_fall";
import OnceFirst from "../../concept/once/once_first";

export default class BoardClick {
	constructor(cells: BoardCells, fall: BoardFall) {
		this.cells = cells;
		this.fall = fall;
	}

	private cells: BoardCells;
	private fall: BoardFall;

	private clicklisteners: ((isSuccess: boolean) => void)[] = [];

	onClick(listener: (isSuccess: boolean) => void) {
		if (listener != null) {
			this.clicklisteners.push(listener);
		}
	}

	private callClickListener(isSuccess: boolean) {
		for (let i = 0; i < this.clicklisteners.length; i++) {
			this.clicklisteners[i](isSuccess);
		}
	}

	click(area: Click) {
		let self: BoardClick = this;
		let location: Cell = this.cells.getCellByLocation(area.getLocation());
		let success: boolean = location.beClicked(
			new OnceFirst()
				.setCallback(function() {
					self.callClickListener(success);
					self.fall.start();
				})
				.getCallback()
		);
	}
}
