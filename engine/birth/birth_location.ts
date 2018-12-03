import BirthAdapter from "./birth_adapter";
import Birth from "../birth";
import Coordinate from "../../concept/coordinate";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

export default class BirthLocation extends BirthAdapter {
	constructor(defaultBirth: Birth) {
		super();
		this.defaultBirth = defaultBirth;
	}

	private defaultBirth: Birth;

	private births: Birth[] = [];

	private locations: Coordinate[] = [];

	addLocation(location: Coordinate, birth: Birth) {
		this.locations.push(location);
		this.births.push(birth);
	}

	getItem(location: Coordinate): Item {
		let birth: Birth = this.defaultBirth;
		for (let i = 0; i < this.locations.length; i++) {
			if (location.equal(this.locations[i])) {
				birth = this.births[i];
				break;
			}
		}
		if (birth == null) {
			return ItemEmpty.getEmpty();
		}
		return birth.getItem(location);
	}
}
