import Item from "../item";
import Cell from "../cell";
import CellExit from "../cell/cell_exit";
import CellOwner from "../cell_owner";
import Coordinate from "../../concept/coordinate";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener";

export default class BoardExits implements CellOwner {
	constructor(private exit: CellExit[] = []) {
		this.iterate((cell: Cell) => {
			cell.setOwner(this);
			return true;
		});
	}

	itemCleared(item: Item): void {
		this.onItemClear.trigger(item);
	}

	readonly onItemClear: Listener<void, (item: Item) => void> = new ListenerDiffusion();

	getExit(location: Coordinate): CellExit {
		for (let i = 0; i < this.exit.length; i++) {
			let cellExit: CellExit = this.exit[i];
			if (location.equal(cellExit.getLocation())) {
				return cellExit;
			}
		}
		return null;
	}

	iterate(onExit: (exit: CellExit) => void) {
		for (let i = 0; i < this.exit.length; i++) {
			onExit(this.exit[i]);
		}
	}

	exploded(cell: Cell, size: number, onEnd: () => void): void {
		onEnd();
	}
}
