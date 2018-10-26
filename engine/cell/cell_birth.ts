import Cell from "../cell";
import Item from "../item";
import Birth from "../birth";
import CellOwner from "../cell_owner";
import Coordinate from "../../algorithm/coordinate";

export default class CellBirth implements Cell {
	constructor() {}
	private birth: Birth;
	private location: Coordinate;
	setOwner(owner: CellOwner) {}
	setBirth(birth: Birth, location: Coordinate) {
		this.birth = birth;
		this.location = location;
	}
	getLocation(): Coordinate {
		return this.location;
	}
	rob(victims: Cell[], onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	getItem(): Item {
		return this.birth.getItem(this.location);
	}
	setItem(item: Item) {}
	canRobbed(): boolean {
		return true;
	}
	canExchange(): boolean {
		return false;
	}
	exchange(to: Cell, onEnd: () => void): boolean {
		onEnd();
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

	explode(size: number, onEnd: () => void) {
		onEnd();
	}
	clearMe(onEnd: () => void) {
		onEnd();
	}
}
