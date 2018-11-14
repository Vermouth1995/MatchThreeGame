import Item from "./item";
import ItemOwner from "./item_owner";
import CellOwner from "./cell_owner";

export default interface Cell extends ItemOwner {
	getItem(): Item;
	setItem(item: Item): void;
	setOwner(owner: CellOwner): void;

	canRobbed(): boolean;
	canExchange(): boolean;

	polymerizedAsOwner(size: number, onEnd: () => void): void;
	polymerizedAsGuest(onEnd: () => void): void;
	exploded(onEnd: () => void): void;
	scraped(onEnd: () => void): void;
	clicked(onEnd: () => void): void;
	// exchanged(onEnd: () => void): void;

	rob(victims: Cell[], onEnd: () => void): boolean;
	exchange(to: Cell, onEnd: () => void): boolean;
	explode(size: number, onEnd: () => void): void;
}
