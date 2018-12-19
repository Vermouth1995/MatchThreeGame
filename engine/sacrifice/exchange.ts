import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Exchange extends SacrificeAdapter {
	constructor(private from: Coordinate, private to: Coordinate) {
		super();
	}

	getFrom(): Coordinate {
		return this.from;
	}

	getTo(): Coordinate {
		return this.to;
	}

	isNeighbor(): boolean {
		return this.from.isNeighbor(this.to);
	}
}
