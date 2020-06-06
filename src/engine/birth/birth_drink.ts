import ItemCreator from "../item/item_creator";
import BirthItem from "./birth_item";

export default class BirthDrink extends BirthItem {
	constructor() {
		super(ItemCreator.DRINK);
	}
}
