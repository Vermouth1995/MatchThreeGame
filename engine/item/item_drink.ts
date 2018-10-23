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

	polymerizedAsOwner(size: number,onEnd: () => void) {
        onEnd();
    }
	polymerizedAsGuest(onEnd: () => void) {
        onEnd();
    }
	exploded(onEnd: () => void) {
        onEnd();
    }
	scraped(onEnd: () => void) {
        onEnd();
    }
}
