import Item from "../item";
import Puzzle from "../../render/puzzle";
import RenderAdapter from "../../render/render_adapter";
import ItemOwner from "../item_owner";
import Coordinate from "../../concept/coordinate";

export default class ItemEmpty implements Item {
	constructor() {}

	equals(item: Item): boolean {
		return false;
	}

	private static instance: ItemEmpty = new ItemEmpty();

	static getEmpty(): ItemEmpty {
		return ItemEmpty.instance;
	}

	canPolymerize(): boolean {
		return false;
	}

	moved(offset: Coordinate, timeCost: number): void {}

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
	clicked(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	exchanged(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	cleared(onEnd: () => void) {
		onEnd();
	}
	created(onEnd: () => void) {
		onEnd();
	}

	getPuzzle(): Puzzle {
		return null;
	}

	setOwner(owner: ItemOwner): void {}

	isEmpty(): boolean {
		return true;
	}

	getImageId(): number {
		return RenderAdapter.IMAGE_ID_EMPTY;
	}
}
