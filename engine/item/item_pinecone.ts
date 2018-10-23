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

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	exploded(onEnd: () => void) {
		this.cleared(onEnd);
	}
	scraped(onEnd: () => void) {
		this.cleared(onEnd);
	}
}
