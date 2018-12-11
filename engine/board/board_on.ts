import BoardCells from "./board_cells";
import BoardClick from "./board_click";
import BoardExchange from "./board_exchange";
import BoardFall from "./board_fall";
import Item from "../item";

export default class BoardOn {
	constructor(
		private cells: BoardCells,
		private click: BoardClick,
		private exchange: BoardExchange,
		private fall: BoardFall
	) {}

	onStep(step: () => void) {
		this.click.onClick(function(isSuccess: boolean) {
			if (isSuccess) {
				step();
			}
		});
		this.exchange.onExchange(function(isSuccess: boolean) {
			if (isSuccess) {
				step();
			}
		});
	}

	onFallEnd(onEnd: () => void) {
		this.fall.onFallEnd(onEnd);
	}

	onItemClear(onCleared: (item: Item) => void) {
		this.cells.onItemClear(onCleared);
	}
}
