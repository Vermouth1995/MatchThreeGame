import Cell from "../cell";
import Item from "../item";

export default class CellEmpty implements Cell {
	constructor() {}

	exploded() {}

	scraped() {}

	getItem(): Item {
		return;
	}

	setItem(item: Item) {
		//TODO
	}
}
