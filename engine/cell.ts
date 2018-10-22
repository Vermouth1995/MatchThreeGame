import Item from "./item";
import CellOwner from "./cell_owner";

export default interface Cell {
	getItem(): Item;
	setItem(item: Item);
	canFall(): boolean;
	polymerizedAsOwner(size: number);
	polymerizedAsGuest();
	exploded();
	explode(size: number);
	scraped();
	setOwner(owner: CellOwner);
}
