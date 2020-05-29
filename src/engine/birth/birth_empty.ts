import Item from "../item/item";
import ItemEmpty from "../item/prop/item_empty";
import BirthWithoutLocation from "./birth_without_location";

export default class BirthEmpty extends BirthWithoutLocation {
	constructor() {
		super();
	}
	getItemWithoutLocation(): Item {
		return ItemEmpty.getEmpty();
	}
	popItemWithoutLocation(): Item {
		return ItemEmpty.getEmpty();
	}

	private static instance: BirthEmpty = new BirthEmpty();

	static getEmpty(): BirthEmpty {
		return BirthEmpty.instance;
	}
}
