import BirthWeight from "./birth_weight";
import BirthItem from "./birth_item";
import BirthAdapter from "./birth_adapter";
import Item from "../item/item";
import ItemCreator from "../item/item_creator";

export default class BirthEliminate extends BirthAdapter {
	constructor(outter: number[] = []) {
		super();
		for (let i = 0; i < BirthEliminate.Eliminates.length; i++) {
			var active: boolean = true;
			for (let j = 0; j < outter.length; j++) {
				if (BirthEliminate.Eliminates[i] == outter[j]) {
					active = false;
				}
			}
			if (active) {
				this.birth.addBirthWeight(new BirthItem(BirthEliminate.Eliminates[i]));
			}
		}
	}

	private static readonly Eliminates: number[] = [
		ItemCreator.APPLE,
		ItemCreator.BLUEBERRY,
		ItemCreator.FLOWER,
		ItemCreator.LEAF,
		ItemCreator.PEAR,
		ItemCreator.WATER,
	];

	private birth: BirthWeight = new BirthWeight();

	getItem(): Item {
		return this.birth.getItem();
	}
	popItem(): Item {
		return this.getItem();
	}
}
