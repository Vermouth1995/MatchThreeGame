import Item from "./item";

export default interface ItemOwner {
	setItem(item: Item);
	explode(size: number, onEnd: () => void);
	clearMe(onEnd: () => void);
}
