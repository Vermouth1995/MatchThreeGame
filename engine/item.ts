import ItemOwner from "./item_owner";

export default interface Item {
	equals(item: Item): boolean;
	canPolymerize(): boolean;
	polymerizedAsOwner(size: number, onEnd: () => void): void;
	polymerizedAsGuest(onEnd: () => void): void;
	exploded(onEnd: () => void): void;
	scraped(onEnd: () => void): void;
	cleared(onEnd: () => void): void;
	setOwner(owner: ItemOwner): void;
}
