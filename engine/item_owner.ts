import Item from "./item";

export default interface ItemOwner {
	setItem(item: Item): void;
	exploded(size: number, onEnd: () => void): void;
	itemCleared(item: Item): void;
	itemClearedAnimationEnd(item: Item): void;
	itemCreated(item: Item): void;
	itemCreatedAnimationEnd(item: Item): void;
}
