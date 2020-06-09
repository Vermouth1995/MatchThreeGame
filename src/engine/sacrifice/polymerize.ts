import Scrape from "./scrape";
import Coordinate from "../../concept/coordinate/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Polymerize extends SacrificeAdapter {
	constructor(private owner: Coordinate, private guests: Coordinate[]) {
		super();
	}

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
