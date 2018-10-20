import Item from "../../item";
import ItemEliminate from "../item_eliminate";

export default class ItemLeaf extends ItemEliminate {
	constructor() {
		super();
	}
	equals(item: Item): boolean {
		return item instanceof ItemLeaf;
	}
}
