import Item from "./item";
import CellOwner from "./cell_owner";

export default interface Cell {
	getItem(): Item;
	setItem(item: Item);
	exploded();
	scraped();
	cleared();
	setOwner(owner: CellOwner);
}
