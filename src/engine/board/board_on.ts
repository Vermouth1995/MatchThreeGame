import BoardCells from "./board_cells";
import BoardExits from "./board_exits";
import BoardClick from "./board_click";
import BoardExchange from "./board_exchange";
import BoardFall from "./board_fall";
import Item from "../item/item";

export default class BoardOn {
	constructor(
		private cells: BoardCells,
		private exits: BoardExits,
		private click: BoardClick,
		private exchange: BoardExchange,
		private fall: BoardFall
	) {}

	onStep(step: () => void) {
		this.click.onClick.on((isSuccess: boolean) => {
			if (isSuccess) {
				step();
			}
		});
		this.exchange.onExchange.on((isSuccess: boolean) => {
			if (isSuccess) {
				step();
			}
		});
	}

	onFallEnd(onEnd: () => void) {
		this.fall.onFallEnd.on(onEnd);
	}

	onItemClear(onCleared: (item: Item) => void) {
		this.cells.onItemClear.on(onCleared);
		this.exits.onItemClear.on(onCleared);
	}
}
