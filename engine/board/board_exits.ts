import Item from "../item";
import Cell from "../cell";
import CellExit from "../cell/cell_exit";
import CellOwner from "../cell_owner";
import Coordinate from "../../concept/coordinate";

export default class BoardExits implements CellOwner {
	constructor(exit: CellExit[]) {
		let self = this;
		if (exit == null) {
			exit = [];
		}
		this.exit = exit;
		this.iterate(function(cell: Cell): boolean {
			cell.setOwner(self);
			return true;
		});
	}

	private itemClearedListener: ((item: Item) => void)[] = [];

	itemCleared(item: Item): void {
		for (let i = 0; i < this.itemClearedListener.length; i++) {
			this.itemClearedListener[i](item);
		}
	}

	onItemClear(listener: (item: Item) => void) {
		if (listener != null) {
			this.itemClearedListener.push(listener);
		}
	}

	private exit: CellExit[];

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
