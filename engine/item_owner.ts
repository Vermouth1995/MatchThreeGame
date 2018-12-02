import Item from "./item";

export default interface ItemOwner {
	setItem(item: Item): void;
	explode(size: number, onEnd: () => void): void;
	onItemClear(onEnd: (onHide: () => void) => void): void;
}
