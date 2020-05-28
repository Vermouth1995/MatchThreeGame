import BirthWithoutLocation from "./birth_without_location";
import Item from "../item/item";
import ItemCreator from "../item/item_creator";
import RandomWeight from "../../concept/random_weight";

export default class BirthItemWeight extends BirthWithoutLocation {
	constructor() {
		super();
	}

	private random: RandomWeight<number> = new RandomWeight<number>();

	addItemWeight(itemCreatorId: number, weight?: number): BirthItemWeight {
		this.random.addFactor(itemCreatorId, weight);
		return this;
	}

	getItemWithoutLocation(): Item {
		return ItemCreator.createItem(this.random.getFactor());
	}

	popItemWithoutLocation(): Item {
		return this.getItemWithoutLocation();
	}
}
