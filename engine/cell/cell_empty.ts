import Item from "../item";
import Cell from "../cell";
import ItemEmpty from "../item/item_empty";
import Puzzle from "../../render/puzzle";
import CellOwner from "../cell_owner";
import Coordinate from "../../concept/coordinate";

export default class CellEmpty implements Cell {
	constructor() {}
	isEmpty(): boolean {
		return true;
	}
	getItem(): Item {
		return ItemEmpty.getEmpty();
	}

	popItem(): Item {
		return ItemEmpty.getEmpty();
	}

	setItem(item: Item) {}
	setOwner(owner: CellOwner): void {}

	private static instance: CellEmpty = new CellEmpty();

	static getEmpty(): CellEmpty {
		return CellEmpty.instance;
	}

	canRobbed(): boolean {
		return false;
	}
	canExchange(): boolean {
		return false;
	}

	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	rob(victims: Cell[], offsets: Coordinate[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	exploded(size: number, onEnd: () => void) {
		onEnd();
	}

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

	itemCleared(item: Item) {}

	itemClearedAnimationEnd(item: Item) {}

	itemCreated(item: Item) {}

	itemCreatedAnimationEnd(item: Item) {}

	getPuzzle(): Puzzle {
		return null;
	}

	renderSaveBack(where: Coordinate, when: number): void {}

	getUpdateTime(): number {
		return 0;
	}
}
