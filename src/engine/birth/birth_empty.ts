import Item from "../item/item";
import ItemEmpty from "../item/prop/item_empty";
import BirthAdapter from "./birth_adapter";

export default class BirthEmpty extends BirthAdapter {
	constructor() {
		super();
	}
	getItem(): Item {
		return ItemEmpty.getEmpty();
	}
	popItem(): Item {
		return ItemEmpty.getEmpty();
	}

	private static instance: BirthEmpty = new BirthEmpty();

	static getEmpty(): BirthEmpty {
		return BirthEmpty.instance;
	}
}
