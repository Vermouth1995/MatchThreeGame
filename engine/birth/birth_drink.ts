import Item from "../item/item";
import ItemCreator from "../item/item_creator";
import BirthWithoutLocation from "./birth_without_location";

export default class BirthDrink extends BirthWithoutLocation {
	constructor() {
		super();
	}

	getItemWithoutLocation(): Item {
		return ItemCreator.createItem(ItemCreator.DRINK);
	}
	popItemWithoutLocation(): Item {
		return this.getItemWithoutLocation();
	}
}
