import BirthAdapter from "./birth_adapter";
import Birth from "../birth";
import Coordinate from "../../concept/coordinate";
import Item from "../item";
import ItemEmpty from "../item/item_empty";

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

	getItem(location: Coordinate): Item {
		let birth: Birth = this.birth;
		if (birth == null || this.size <= 0) {
			birth = this.defaultBirth;
		}
		if (birth == null) {
			return ItemEmpty.getEmpty();
		}

		this.size--;
		return birth.getItem(location);
	}
}
