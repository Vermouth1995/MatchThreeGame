import BirthAdapter from "./birth_adapter";
import Coordinate from "../../concept/coordinate";
import Item from "../item";
import ItemCreator from "../item/item_creator";
import RandomWeight from "../../concept/random_weight";

export default class BirthEliminate extends BirthAdapter {
	constructor() {
		super();
		new RandomWeight();
	}

	private static readonly OUR_WEIGHTS: number = 1;

	private static random: RandomWeight<number> = (function(): RandomWeight<number> {
		let random: RandomWeight<number> = new RandomWeight<number>();
		random.addFactor(ItemCreator.APPLE, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(ItemCreator.BLUEBERRY, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(ItemCreator.FLOWER, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(ItemCreator.LEAF, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(ItemCreator.PEAR, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(ItemCreator.WATER, BirthEliminate.OUR_WEIGHTS);
		return random;
	})();

	getItem(loc: Coordinate): Item {
		return ItemCreator.createItem(BirthEliminate.random.getFactor());
	}
}
