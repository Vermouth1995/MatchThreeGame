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
	onExplode(size: number, onEnd: () => void) {
		onEnd();
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
	clicked(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	exchanged(onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	onItemClear(item: Item) {}

	onItemClearAnimationEnd(item: Item) {}

	onItemCreate(item: Item) {}

	onItemCreateAnimationEnd(item: Item) {}

	getPuzzle(): Puzzle {
		return null;
	}

	renderSaveBack(where: Coordinate, when: number): void {}

	getUpdateTime(): number {
		return 0;
	}
}
