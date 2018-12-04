import BirthItemWeight from "./birth_item_weight";
import Item from "../item";
import ItemCreator from "../item_creator";
import BirthWithoutLocation from "./birth_without_location";

export default class BirthEliminate extends BirthWithoutLocation {
	constructor() {
		super();
	}

	private static birth: BirthItemWeight = (function(): BirthItemWeight {
		let birth: BirthItemWeight = new BirthItemWeight();
		birth.addItemWeight(ItemCreator.APPLE);
		birth.addItemWeight(ItemCreator.BLUEBERRY);
		birth.addItemWeight(ItemCreator.FLOWER);
		birth.addItemWeight(ItemCreator.LEAF);
		birth.addItemWeight(ItemCreator.PEAR);
		birth.addItemWeight(ItemCreator.WATER);
		return birth;
	})();

	getItemWithoutLocation(): Item {
		return BirthEliminate.birth.getItemWithoutLocation();
	}
}
