import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";
export default class Click extends SacrificeAdapter {
	constructor(private location: Coordinate) {
		super();
	}

	getLocation(): Coordinate {
		return this.location;
	}
}
