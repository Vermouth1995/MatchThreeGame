import BirthAdapter from "./birth_adapter";
import Coordinate from "../coordinate";
import Item from "../item";
import RandomWeight from "../../algorithm/random_weight";

export default class BirthEliminate extends BirthAdapter {
	constructor() {
		super();
		new RandomWeight();
	}

	private static readonly OUR_WEIGHTS: number = 1;

	private static random: RandomWeight<number> = (function(): RandomWeight<number> {
		let random: RandomWeight<number> = new RandomWeight<number>();
		random.addFactor(BirthAdapter.APPLE, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(BirthAdapter.BLUEBERRY, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(BirthAdapter.FLOWER, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(BirthAdapter.LEAF, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(BirthAdapter.PEAR, BirthEliminate.OUR_WEIGHTS);
		random.addFactor(BirthAdapter.WATER, BirthEliminate.OUR_WEIGHTS);
		return random;
	})();

	getItem(loc: Coordinate): Item {
		return BirthAdapter.createItem(BirthEliminate.random.getFactor());
	}
}
