import ItemOwner from "./item_owner";

export default interface Item {
	equals(item: Item): boolean;
	canPolymerize(): boolean;
	polymerizedAsOwner(size: number);
	polymerizedAsGuest();
	exploded();
	scraped();
	cleared();
	setOwner(owner: ItemOwner);
}
