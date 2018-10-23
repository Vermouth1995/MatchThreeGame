import CellAdapter from "./cell_adapter";
import Item from "../item";
import Cell from "../cell";
import ItemEmpty from "../item/item_empty";

export default class CellEmpty extends CellAdapter {
	constructor() {
		super();
	}
	getItem(): Item {
		return ItemEmpty.getEmpty();
	}

	rob(victims: Cell[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	setItem(item: Item) {}

	private static instance: CellEmpty = new CellEmpty();

	static getEmpty(): CellEmpty {
		return CellEmpty.instance;
	}
	static isEmpty(cell: Cell): boolean {
		return cell instanceof CellEmpty;
	}
	canRobbed(): boolean {
		return false;
	}
	canExchange(): boolean {
		return false;
	}
	exchange(to: Cell, onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	exploded(onEnd: () => void) {
		onEnd();
	}
	scraped(onEnd: () => void) {
		onEnd();
	}
	clearMe(onEnd: () => void) {
		onEnd();
	}
}
