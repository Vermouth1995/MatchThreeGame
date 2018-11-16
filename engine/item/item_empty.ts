import Item from "../item";
import Puzzle from "../../render/puzzle";
import ItemOwner from "../item_owner";

export default class ItemEmpty implements Item {
	constructor() {}

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
	clicked(onEnd: () => void) {
		onEnd();
	}
	cleared(onEnd: () => void) {
		onEnd();
	}

	getPuzzle(): Puzzle {
		return null;
	}

	setOwner(owner: ItemOwner): void {}
}
