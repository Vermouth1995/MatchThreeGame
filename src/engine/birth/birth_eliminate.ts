import BirthWeight from "./birth_weight";
import BirthItem from "./birth_item";
import BirthAdapter from "./birth_adapter";
import Item from "../item/item";
import ItemCreator from "../item/item_creator";

export default class BirthEliminate extends BirthAdapter {
	constructor(size: number = BirthEliminate.FULL_SIZE) {
		super();
		if (size > BirthEliminate.FULL_SIZE) {
			size = BirthEliminate.FULL_SIZE;
		}
		for (let i = 0; i < size; i++) {
			this.birth.addBirthWeight(new BirthItem(BirthEliminate.Eliminates[i]));
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

	public static readonly FULL_SIZE: number = 6;
	public static readonly SIMPLE_SIZE: number = 5;

	private birth: BirthWeight = new BirthWeight();

	getItem(): Item {
		return this.birth.getItem();
	}
	popItem(): Item {
		return this.getItem();
	}
}
