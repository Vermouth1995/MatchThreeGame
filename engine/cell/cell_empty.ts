import CellAdapter from "./cell_adapter";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

export default class CellEmpty extends CellAdapter {
	constructor() {
		super();
	}
	getItem(): Item {
		return ItemEmpty.getEmpty();
	}
	setItem(item: Item) {}

	private static instance: CellEmpty = new CellEmpty();

	static getEmpty(): CellEmpty {
		return CellEmpty.instance;
	}
	canFall(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number) {}
	polymerizedAsGuest() {}
	exploded() {}
	scraped() {}
	clearMe() {}
}
