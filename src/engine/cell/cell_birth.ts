import Cell from "./cell";
import Item from "../item/item";
import Birth from "../birth/birth";
import CellOwner from "./cell_owner";
import Coordinate from "../../concept/coordinate/coordinate";
import Puzzle from "../../render/puzzle";

export default class CellBirth implements Cell {
	constructor() {}

	private birth: Birth;
	private location: Coordinate;
	isEmpty(): boolean {
		return false;
	}
	setOwner(owner: CellOwner) {}
	setBirth(birth: Birth, location: Coordinate) {
		this.birth = birth;
		this.location = location;
	}
	getLocation(): Coordinate {
		return this.location;
	}

	getItem(): Item {
		return this.birth.getItem();
	}

	popItem(): Item {
		return this.birth.popItem();
	}
	setItem(item: Item) {}

	canRobbed(): boolean {
		return true;
	}
	canExchange(): boolean {
		return false;
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

	rob(victims: Cell[], offsets: Coordinate[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	exploded(size: number, onEnd: () => void) {
		onEnd();
	}
	itemCleared(item: Item) {}

	itemClearedAnimationEnd(item: Item) {}

	itemCreated(item: Item) {}

	itemCreatedAnimationEnd(item: Item) {}

	resizePuzzle(size: Coordinate): void {}

	getPuzzle(): Puzzle {
		return null;
	}
	renderSaveBack(where: Coordinate, when: number): void {}

	getUpdateTime(): number {
		return 0;
	}
}
