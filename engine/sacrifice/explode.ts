import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Explode extends SacrificeAdapter {
	constructor(source: Coordinate, size: number) {
		super();
		this.guests = source.radiation(size);
		this.owner = source;
	}

	private owner: Coordinate;
	private guests: Coordinate[] = [];

	getOwner(): Coordinate {
		return this.owner;
	}

	getGuests(): Coordinate[] {
		return this.guests;
	}
}
