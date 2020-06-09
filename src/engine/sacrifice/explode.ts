import Coordinate from "../../concept/coordinate/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Explode extends SacrificeAdapter {
	constructor(private owner: Coordinate, size: number) {
		super();
		this.guests = this.owner.radiation(size);
	}

	private guests: Coordinate[] = [];

	getOwner(): Coordinate {
		return this.owner;
	}

	getGuests(): Coordinate[] {
		return this.guests;
	}
}
