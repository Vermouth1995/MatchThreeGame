import BirthWithoutLocation from "./birth_without_location";
import Item from "../item";
import ItemCreator from "../item_creator";
import RandomWeight from "../../concept/random_weight";

export default class BirthItemWeight extends BirthWithoutLocation {
	constructor() {
		super();
	}

	private random: RandomWeight<number> = new RandomWeight<number>();

	addItemWeight(itemCreatorId: number, weight: number) {
		this.random.addFactor(itemCreatorId, weight);
	}

	getItemWithoutLocation(): Item {
		return ItemCreator.createItem(this.random.getFactor());
	}
}
