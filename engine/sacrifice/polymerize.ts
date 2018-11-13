import Scrape from "./scrape";
import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Polymerize extends SacrificeAdapter {
	constructor(owner: Coordinate, guests: Coordinate[]) {
		super();
		this.owner = owner;
		this.guests = guests;
	}

	private owner: Coordinate;
	private guests: Coordinate[] = [];

	getScrape(): Scrape {
		return new Scrape(this.guests.concat(this.owner));
	}

	getOwner(): Coordinate {
		return this.owner;
	}

	getGuests(): Coordinate[] {
		return this.guests;
	}
}
