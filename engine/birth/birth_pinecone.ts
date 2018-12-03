import Item from "../item";
import ItemCreator from "../item_creator";
import BirthWithoutLocation from "./birth_without_location";

export default class BirthPinecone extends BirthWithoutLocation {
	constructor() {
		super();
	}
	getItemWithoutLocation(): Item {
		return ItemCreator.createItem(ItemCreator.PINECONE);
	}
}
