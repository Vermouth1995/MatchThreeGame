import Item from "../../item";
import ItemEliminate from "../item_eliminate";

export default class ItemPear extends ItemEliminate {
	constructor() {
		super();
	}
	equals(item: Item): boolean {
		return item instanceof ItemPear;
	}
}
