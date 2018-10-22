import Coordinate from "../coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
import Scrape from "./scrape";

export default class Polymerize extends SacrificeAdapter {
	constructor() {
		super();
	}

	getScrape(): Scrape {
		return new Scrape(this.guest.concat(this.owner));
	}
}
