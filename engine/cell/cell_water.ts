import CellAdapter from "./cell_adapter";
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
	clearMe() {}
	canFall(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number) {}
	polymerizedAsGuest() {}
	exploded() {}
	scraped() {}
}
