import CellAdapter from "./cell_adapter";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

export default class CellLand extends CellAdapter {
	constructor() {
		super();
	}
	private item: Item;
	getItem(): Item {
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		return this.item;
	}
	setItem(item: Item) {
		this.item = item;
		this.item.setOwner(this);
	}
	clearMe() {
		this.item.setOwner(null);
		this.item = null;
	}
	canFall(): boolean {
		return true;
	}

	polymerizedAsOwner(size: number) {
		this.item.polymerizedAsOwner(size);
	}
	polymerizedAsGuest() {
		this.item.polymerizedAsGuest();
	}
	exploded() {
		this.item.exploded();
	}
	scraped() {
		this.item.scraped();
	}
}
