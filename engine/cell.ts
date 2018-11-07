import Item from "./item";
import ItemOwner from "./item_owner";
import CellOwner from "./cell_owner";

export default interface Cell extends ItemOwner {
	getItem(): Item;
	setItem(item: Item): void;
	canRobbed(): boolean;
	canExchange(): boolean;
	polymerizedAsOwner(size: number, onEnd: () => void): void;
	polymerizedAsGuest(onEnd: () => void): void;
	exploded(onEnd: () => void): void;
	explode(size: number, onEnd: () => void): void;
	scraped(onEnd: () => void): void;
	rob(victims: Cell[], onEnd: () => void): boolean;
	exchange(to: Cell, onEnd: () => void): boolean;
	setOwner(owner: CellOwner): void;
}
