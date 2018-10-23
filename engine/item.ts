import ItemOwner from "./item_owner";

export default interface Item {
	equals(item: Item): boolean;
	canPolymerize(): boolean;
	polymerizedAsOwner(size: number,onEnd: () => void);
	polymerizedAsGuest(onEnd: () => void);
	exploded(onEnd: () => void);
	scraped(onEnd: () => void);
	cleared(onEnd: () => void);
	setOwner(owner: ItemOwner);
}
