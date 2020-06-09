import Item from "../item";
import Puzzle from "../../../render/puzzle";
import RenderAdapter from "../../../render/render_adapter";
import ItemOwner from "../item_owner";
import Coordinate from "../../../concept/coordinate";

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

	bePolymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	beExploded(onEnd: () => void) {
		onEnd();
	}
	beScraped(onEnd: () => void) {
		onEnd();
	}
	beClicked(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	beExchanged(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	cleared(onEnd: () => void) {
		onEnd();
	}
	created(onEnd: () => void) {
		onEnd();
	}
	resizePuzzle(size: Coordinate): void {}

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
