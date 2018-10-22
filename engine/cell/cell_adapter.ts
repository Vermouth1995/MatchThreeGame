import Cell from "../cell";
import Item from "../item";
import CellOwner from "../cell_owner";
import ItemOwner from "../item_owner";

export default abstract class CellAdapter implements Cell, ItemOwner {
	constructor() {}
	protected owner: CellOwner;
	setOwner(owner: CellOwner) {
		this.owner = owner;
	}

	abstract getItem(): Item;
	abstract setItem(item: Item);
	abstract canFall(): boolean;

	abstract polymerizedAsOwner(size: number);
	abstract polymerizedAsGuest();
	abstract exploded();
	abstract scraped();

	explode(size: number) {
		this.owner.explode(this, size);
	}
	abstract clearMe();
}
