import Item from "../item";
import ItemAdapter from "./item_adapter";

export default class ItemEmpty extends ItemAdapter {
	constructor() {
		super();
	}

	equals(item: Item): boolean {
		return false;
	}

	static isEmpty(item: Item): boolean {
		return item instanceof ItemEmpty;
	}

	private static instense: ItemEmpty = new ItemEmpty();

	static getEmpty(): ItemEmpty {
		return ItemEmpty.instense;
	}

	canPolymerize(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number) {}
	polymerizedAsGuest() {}
	exploded() {}
	scraped() {}
}
