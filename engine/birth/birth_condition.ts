import BirthAdapter from "./birth_adapter";
import Birth from "../birth";
import Coordinate from "../../concept/coordinate";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

export default class BirthCondition extends BirthAdapter {
	constructor(condition: () => boolean, birth: Birth, defaultBirth: Birth) {
		super();
		this.condition = condition;
		this.birth = birth;
		this.defaultBirth = defaultBirth;
	}

	private condition: () => boolean;

	private defaultBirth: Birth;

	private birth: Birth;

	getItem(location: Coordinate): Item {
		let birth: Birth = this.birth;
		if (birth == null || this.condition == null || !this.condition()) {
			birth = this.defaultBirth;
		}
		if (birth == null) {
			return ItemEmpty.getEmpty();
		}

		return birth.getItem(location);
	}
}
