import Item from "../item/item";
import Coordinate from "../../concept/coordinate";
import BirthAdapter from "./birth_adapter";

export default abstract class BirthWithoutLocation extends BirthAdapter {
	constructor() {
		super();
	}

	getItem(_: Coordinate): Item {
		return this.getItemWithoutLocation();
	}
	popItem(_: Coordinate): Item {
		return this.popItemWithoutLocation();
	}
	abstract getItemWithoutLocation(): Item;
	abstract popItemWithoutLocation(): Item;
}
