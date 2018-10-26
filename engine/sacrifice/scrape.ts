import Coordinate from "../../algorithm/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Scrape extends SacrificeAdapter {
	constructor(source: Coordinate[]) {
		super();
		this.source = source;
		for (let i = 0; i < source.length; ++i) {
			this.addGuest(source[i].offset(Coordinate.UP));
			this.addGuest(source[i].offset(Coordinate.DOWN));
			this.addGuest(source[i].offset(Coordinate.LEFT));
			this.addGuest(source[i].offset(Coordinate.RIGHT));
		}
	}

	private source: Coordinate[];

	addGuest(guest: Coordinate) {
		if (guest.isIncluded(this.source) || guest.isIncluded(this.guest)) {
			return;
		}
		this.guest.push(guest);
	}
}
