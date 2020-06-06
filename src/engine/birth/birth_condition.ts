import BirthEmpty from "./birth_empty";
import Birth from "./birth";
import BirthAdapter from "./birth_adapter";
import Item from "../item/item";

export default class BirthCondition extends BirthAdapter {
	constructor(private condition: () => boolean, private birth: Birth, private defaultBirth: Birth) {
		super();
	}

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

	getItem(): Item {
		return this.getBirth().getItem();
	}

	popItem(): Item {
		return this.getBirth().popItem();
	}
}
