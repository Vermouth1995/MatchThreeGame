import BirthItemWeight from "./birth_item_weight";
import Item from "../item";
import ItemCreator from "../item_creator";
import BirthWithoutLocation from "./birth_without_location";

export default class BirthEliminate extends BirthWithoutLocation {
	constructor() {
		super();
	}

	private static readonly OUR_WEIGHTS: number = 1;

	private static birth: BirthItemWeight = (function(): BirthItemWeight {
		let birth: BirthItemWeight = new BirthItemWeight();
		birth.addItemWeight(ItemCreator.APPLE, BirthEliminate.OUR_WEIGHTS);
		birth.addItemWeight(ItemCreator.BLUEBERRY, BirthEliminate.OUR_WEIGHTS);
		birth.addItemWeight(ItemCreator.FLOWER, BirthEliminate.OUR_WEIGHTS);
		birth.addItemWeight(ItemCreator.LEAF, BirthEliminate.OUR_WEIGHTS);
		birth.addItemWeight(ItemCreator.PEAR, BirthEliminate.OUR_WEIGHTS);
		birth.addItemWeight(ItemCreator.WATER, BirthEliminate.OUR_WEIGHTS);
		return birth;
	})();

	getItemWithoutLocation(): Item {
		return BirthEliminate.birth.getItemWithoutLocation();
	}
}
