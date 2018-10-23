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

	private static instance: ItemEmpty = new ItemEmpty();

	static getEmpty(): ItemEmpty {
		return ItemEmpty.instance;
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
		onEnd();
	}
	scraped(onEnd: () => void) {
		onEnd();
	}
}
