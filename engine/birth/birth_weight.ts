import BirthAdapter from "./birth_adapter";
import Birth from "../birth";
import ItemEmpty from "../item/item_empty";
import Item from "../item";
import RandomWeight from "../../concept/random_weight";
import Coordinate from "../../concept/coordinate";

export default class BirthItemWeight extends BirthAdapter {
	constructor(defaultBirth: Birth) {
		super();
		this.defaultBirth = defaultBirth;
	}

	private defaultBirth: Birth;

	private random: RandomWeight<Birth> = new RandomWeight<Birth>();

	addBirthWeight(birth: Birth, weight: number) {
		this.random.addFactor(birth, weight);
	}

	getItem(location: Coordinate): Item {
		let birth: Birth = this.random.getFactor();
		if (birth == null) {
			birth = this.defaultBirth;
		}
		if (birth == null) {
			return ItemEmpty.getEmpty();
		}
		return birth.getItem(location);
	}
}
