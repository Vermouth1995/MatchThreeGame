import Item from "./item";

export default interface ItemOwner {
	setItem(item: Item):void;
	explode(size: number, onEnd: () => void):void;
	clearMe(onEnd: () => void):void;
}
