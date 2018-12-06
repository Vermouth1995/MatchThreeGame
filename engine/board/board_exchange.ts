import Cell from "../cell";
import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Exchange from "../sacrifice/exchange";
import Polymerize from "../sacrifice/polymerize";
import BoardFall from "../board/board_fall";
import BoardPolymerize from "../board/board_polymerize";
import BoardCheck from "../board/board_check";

export default class BoardExchange {
	constructor(cells: BoardCells, fall: BoardFall, polymerize: BoardPolymerize, check: BoardCheck) {
		this.cells = cells;
		this.fall = fall;
		this.polymerize = polymerize;
		this.check = check;
	}

	private cells: BoardCells;
	private fall: BoardFall;
	private polymerize: BoardPolymerize;
	private check: BoardCheck;

	exchange(area: Exchange, onEnd: () => void) {
		let self: BoardExchange = this;
		let exchangeEnd: OnceLast = new OnceLast();
		exchangeEnd.setCallback(function() {
			self.fall.start(onEnd);
		});
		if (area == null || !area.isNeighbor()) {
			exchangeEnd.getCallback()();
			return;
		}
		let fromCell: Cell = this.cells.getCellByLocation(area.getFrom());
		let toCell: Cell = this.cells.getCellByLocation(area.getTo());
		let success: boolean = fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), function() {
			if (!success) {
				exchangeEnd.getCallback()();
				return;
			}

			let polymerize: Polymerize = self.check.check();
			if (polymerize != null) {
				self.polymerize.polymerize(polymerize, exchangeEnd.getCallback());
			}
			let fromBlock: boolean = fromCell.exchanged(exchangeEnd.getCallback());
			let toBlock: boolean = toCell.exchanged(exchangeEnd.getCallback());
			if (polymerize == null && !fromBlock && !toBlock) {
				fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), exchangeEnd.getCallback());
				return;
			}
		});
	}
}
