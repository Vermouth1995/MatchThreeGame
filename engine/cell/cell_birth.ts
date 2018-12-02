import Cell from "../cell";
import Item from "../item";
import Birth from "../birth";
import CellOwner from "../cell_owner";
import Coordinate from "../../concept/coordinate";
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
		return this.birth.getItem(this.getLocation());
	}

	popItem(): Item {
		return this.getItem();
	}
	setItem(item: Item) {}

	canRobbed(): boolean {
		return true;
	}
	canExchange(): boolean {
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
	exchanged(onEnd: () => void): boolean {
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
	explode(size: number, onEnd: () => void) {
		onEnd();
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
