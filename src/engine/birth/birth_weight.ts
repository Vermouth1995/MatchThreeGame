import BirthEmpty from "./birth_empty";
import Birth from "../birth/birth";
import BirthAdapter from "./birth_adapter";
import Item from "../item/item";
import RandomWeight from "../../concept/random_weight";

export default class BirthWeight extends BirthAdapter {
	constructor() {
		super();
	}

	private random: RandomWeight<Birth> = new RandomWeight<Birth>();

	addBirthWeight(birth: Birth, weight?: number): BirthWeight {
		this.random.addFactor(birth, weight);
		return this;
	}

	private getBirth(): Birth {
		const birth: Birth = this.random.getFactor();
		if (birth == null) {
			return BirthEmpty.getEmpty();
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
