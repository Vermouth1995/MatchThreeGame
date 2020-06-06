import ItemCreator from "../item/item_creator";
import BirthItem from "./birth_item";

export default class BirthPinecone extends BirthItem {
	constructor() {
		super(ItemCreator.PINECONE);
	}
}
