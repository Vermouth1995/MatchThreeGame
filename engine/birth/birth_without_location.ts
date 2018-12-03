import Item from "../item";
import Coordinate from "../../concept/coordinate";
import BirthAdapter from "./birth_adapter";

export default abstract class BirthWithoutLocation extends BirthAdapter {
	constructor() {
		super();
	}

	getItem(location: Coordinate): Item {
		return this.getItemWithoutLocation();
	}

	abstract getItemWithoutLocation(): Item;
}
