import Item from "./item";

export default interface ItemOwner {
	setItem(item: Item): void;
	explode(size: number, onEnd: () => void): void;
	onItemClear(item: Item): void;
	onItemClearAnimationEnd(item: Item): void;
	onItemCreate(item: Item): void;
	onItemCreateAnimationEnd(item: Item): void;
}
