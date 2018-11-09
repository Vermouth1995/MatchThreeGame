import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Click extends SacrificeAdapter {
	constructor(location: Coordinate) {
		super();
		this.owner = location;
	}
}
