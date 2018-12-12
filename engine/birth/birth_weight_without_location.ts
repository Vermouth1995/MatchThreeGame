import BirthWithoutLocation from "./birth_without_location";
import BirthEmpty from "./birth_empty";
import Item from "../item";
import RandomWeight from "../../concept/random_weight";

export default class BirthWeightWithoutLocation extends BirthWithoutLocation {
	constructor() {
		super();
	}

	private random: RandomWeight<BirthWithoutLocation> = new RandomWeight<BirthWithoutLocation>();

	addBirthWeight(birth: BirthWithoutLocation, weight?: number): BirthWeightWithoutLocation {
		this.random.addFactor(birth, weight);
		return this;
	}

	private getBirth(): BirthWithoutLocation {
		let birth: BirthWithoutLocation = this.random.getFactor();

		if (birth == null) {
			return BirthEmpty.getEmpty();
		}
		return birth;
	}

	getItemWithoutLocation(): Item {
		return this.getBirth().getItemWithoutLocation();
	}

	popItemWithoutLocation(): Item {
		return this.getBirth().popItemWithoutLocation();
	}
}
