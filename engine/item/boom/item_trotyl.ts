import Item from "../../item";
import ItemBoom from "../item_boom";

export default class ItemTrotyl extends ItemBoom {
	constructor() {
		super();
	}
	equals(item: Item): boolean {
		return item instanceof ItemTrotyl;
	}
	public static readonly EXPLODE_SIZE: number = 4;
	getExplodeSize(): number {
		return ItemTrotyl.EXPLODE_SIZE;
	}
}
