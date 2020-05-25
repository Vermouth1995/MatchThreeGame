import Cell from "../cell";
import BoardCells from "./board_cells";
import Click from "../sacrifice/click";
import BoardFall from "../board/board_fall";
import OnceFirst from "../../concept/once/once_first";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener";

export default class BoardClick {
	constructor(private cells: BoardCells, private fall: BoardFall) {}

	readonly onClick: Listener<void, (isSuccess: boolean) => void> = new ListenerDiffusion();

	click(area: Click) {
		let location: Cell = this.cells.getCellByLocation(area.getLocation());
		let success: boolean = location.beClicked(
			new OnceFirst()
				.setCallback(() => {
					this.onClick.trigger(success);
					this.fall.start();
				})
				.getCallback()
		);
	}
}
