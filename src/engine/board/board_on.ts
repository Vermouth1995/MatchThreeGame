import BoardCells from "./board_cells";
import BoardExits from "./board_exits";
import BoardClick from "./board_click";
import BoardExchange from "./board_exchange";
import BoardFall from "./board_fall";
import Item from "../item/item";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener/listener";

export default class BoardOn {
	constructor(
		private cells: BoardCells,
		private exits: BoardExits,
		private click: BoardClick,
		private exchange: BoardExchange,
		private fall: BoardFall
	) {
		this.click.onClick.on((isSuccess: boolean) => {
			if (isSuccess) {
				this.onStep.trigger();
			}
		});
		this.exchange.onExchange.on((isSuccess: boolean) => {
			if (isSuccess) {
				this.onStep.trigger();
			}
		});
		this.fall.onFallEnd.on(() => this.onFallEnd.trigger());
		this.cells.onItemClear.on((item: Item) => this.onItemClear.trigger(item));
		this.exits.onItemClear.on((item: Item) => this.onItemClear.trigger(item));
	}
	public readonly onStep: Listener<void, () => void> = new ListenerDiffusion();
	public readonly onFallEnd: Listener<void, () => void> = new ListenerDiffusion();
	public readonly onItemClear: Listener<void, (item: Item) => void> = new ListenerDiffusion();
}
