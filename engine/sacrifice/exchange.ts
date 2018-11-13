import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Exchange extends SacrificeAdapter {
	constructor(from: Coordinate, to: Coordinate) {
		super();
		this.to = to;
		this.from = from;
		return this;
	}

	private from: Coordinate;
	private to: Coordinate;

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
