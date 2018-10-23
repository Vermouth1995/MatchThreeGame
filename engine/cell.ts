import Item from "./item";
import ItemOwner from "./item_owner";
import CellOwner from "./cell_owner";

export default interface Cell extends ItemOwner {
	getItem(): Item;
	setItem(item: Item);
	canRobbed(): boolean;
	canExchange(): boolean;
	polymerizedAsOwner(size: number,onEnd: () => void);
	polymerizedAsGuest(onEnd: () => void);
	exploded(onEnd: () => void);
	explode(size: number,onEnd: () => void);
	scraped(onEnd: () => void);
	rob(victims: Cell[], onEnd: () => void): boolean;
	exchange(to: Cell, onEnd: () => void): boolean;
	setOwner(owner: CellOwner);
}
