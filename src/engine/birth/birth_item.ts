import Item from "../item/item";
import ItemCreator from "../item/item_creator";
import BirthAdapter from "./birth_adapter";

export default class BirthItem extends BirthAdapter {
	constructor(private itemCreatorId: number) {
		super();
	}

	getItem(): Item {
		return ItemCreator.createItem(this.itemCreatorId);
	}
	popItem(): Item {
		return this.getItem();
	}
}
