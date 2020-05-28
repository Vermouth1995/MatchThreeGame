import Cell from "../cell/cell";
import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Once from "../../concept/once/once";
import Listener from "../../concept/listener/listener";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Exchange from "../sacrifice/exchange";
import Polymerize from "../sacrifice/polymerize";
import BoardFall from "../board/board_fall";
import BoardPolymerize from "../board/board_polymerize";
import BoardCheck from "../board/board_check";

export default class BoardExchange {
	constructor(
		private cells: BoardCells,
		private fall: BoardFall,
		private polymerize: BoardPolymerize,
		private check: BoardCheck
	) {}

	readonly onExchange: Listener<void, (isSuccess: boolean) => void> = new ListenerDiffusion();

	exchange(area: Exchange) {
		let exchangeEnd: Once = new OnceLast().setCallback(() => {
			this.fall.start();
		});
		if (area == null || !area.isNeighbor()) {
			exchangeEnd.getCallback()();
			return;
		}
		let fromCell: Cell = this.cells.getCellByLocation(area.getFrom());
		let toCell: Cell = this.cells.getCellByLocation(area.getTo());
		let success: boolean = fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), () => {
			if (!success) {
				this.onExchange.trigger(false);
				exchangeEnd.getCallback()();
				return;
			}
			let polymerize: Polymerize = this.check.check();
			if (polymerize != null) {
				this.polymerize.polymerize(polymerize, exchangeEnd.getCallback());
			}
			let fromBlock: boolean = fromCell.beExchanged(exchangeEnd.getCallback());
			let toBlock: boolean = toCell.beExchanged(exchangeEnd.getCallback());
			if (polymerize == null && !fromBlock && !toBlock) {
				this.onExchange.trigger(false);
				fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), exchangeEnd.getCallback());
			} else {
				this.onExchange.trigger(true);
			}
		});
	}
}
