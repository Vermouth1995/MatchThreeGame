import Item from "../item";
import ItemAdapter from "./item_adapter";

export default class ItemDrink extends ItemAdapter {
	constructor() {
		super();
	}

	equals(item: Item): boolean {
		return item instanceof ItemDrink;
	}
	canPolymerize(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number) {}
	polymerizedAsGuest() {}
	exploded() {}
	scraped() {}
}
