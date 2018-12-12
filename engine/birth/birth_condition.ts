import BirthAdapter from "./birth_adapter";
import BirthEmpty from "./birth_empty";
import Birth from "../birth";
import Coordinate from "../../concept/coordinate";
import Item from "../item";

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

	private getBirth(): Birth {
		let birth: Birth = this.birth;
		if (birth == null || this.condition == null || !this.condition()) {
			birth = this.defaultBirth;
		}
		if (birth == null) {
			birth = BirthEmpty.getEmpty();
		}
		return birth;
	}

	getItem(location: Coordinate): Item {
		return this.getBirth().getItem(location);
	}

	popItem(location: Coordinate): Item {
		return this.getBirth().popItem(location);
	}
}
