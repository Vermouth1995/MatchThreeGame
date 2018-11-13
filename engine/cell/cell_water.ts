import CellAdapter from "./cell_adapter";
import Cell from "../cell";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

export default class CellWater extends CellAdapter {
	constructor() {
		super();
	}

	getItem(): Item {
		return ItemEmpty.getEmpty();
	}
	setItem(item: Item) {}
	clearMe(onEnd: () => void) {
		onEnd();
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
	clicked(onEnd: () => void) {
		onEnd();
	}

	rob(victims: Cell[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}
}
