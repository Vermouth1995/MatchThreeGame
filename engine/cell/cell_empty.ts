import Item from "../item";
import Cell from "../cell";
import ItemEmpty from "../item/item_empty";
import Puzzle from "../../render/puzzle";
import CellOwner from "../cell_owner";
import Coordinate from "../../concept/coordinate";

export default class CellEmpty implements Cell {
	constructor() {}
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
	static isEmpty(cell: Cell): boolean {
		return cell instanceof CellEmpty;
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
	rob(victims: Cell[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	explode(size: number, onEnd: () => void) {
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
	clicked(onEnd: () => void) {
		onEnd();
	}

	clearMe(onEnd: () => void) {
		onEnd();
	}

	getPuzzle(): Puzzle {
		return null;
	}
}
