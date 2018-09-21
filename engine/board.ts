import Item from "./item";
import Cell from "./cell";
import Coordinate from "./coordinate";

export default class Board {
	private cells: Cell[][];

	constructor() {}

	public explodeBy(item: Item, size: number) {
		return this.explodeAt(this.getItemLocation(item), size);
	}

	public explodeAt(location: Coordinate, size: number) {
		// TODO
	}

	public getItemByItemOffset(item: Item, offset: Coordinate): Item {
		return this.getItemByLocationOffset(this.getItemLocation(item), offset);
	}

	public getItemByLocationOffset(location: Coordinate, offset: Coordinate): Item {
		return this.getItemByLocation(location.offset(offset));
	}

	public getItemLocation(item: Item): Coordinate {
		// TODO
		return null;
	}

	public getItemByLocation(location: Coordinate): Item {
		// TODO
		return null;
	}
}
