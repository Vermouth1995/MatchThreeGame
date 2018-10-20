import Item from "../item";
import ItemAdapter from "./item_adapter";

export default class ItemPinecone extends ItemAdapter {
	constructor() {
		super();
	}
	equals(item: Item): boolean {
		return item instanceof ItemPinecone;
	}
	canPolymerize(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number) {}
	polymerizedAsGuest() {}
	exploded() {
		this.cleared();
	}
	scraped() {
		this.cleared();
	}
}
