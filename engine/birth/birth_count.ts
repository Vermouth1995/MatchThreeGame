import BirthAdapter from "./birth_adapter";
import BirthEmpty from "./birth_empty";
import Birth from "../birth";
import Coordinate from "../../concept/coordinate";
import Item from "../item";

export default class BirthCount extends BirthAdapter {
	constructor(size: number, birth: Birth, defaultBirth: Birth) {
		super();
		this.size = size;
		this.birth = birth;
		this.defaultBirth = defaultBirth;
	}

	private size: number;

	private defaultBirth: Birth;

	private birth: Birth;

	getSize(): number {
		return this.size;
	}

	private getBirth(): Birth {
		let birth: Birth = this.birth;
		if (birth == null || this.size < 0) {
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
		this.size--;
		return this.getBirth().popItem(location);
	}
}
