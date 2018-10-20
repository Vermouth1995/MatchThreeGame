import Item from "./item";
import ItemBoom from "./item_boom";

export default class ItemDynamite extends ItemBoom {
	constructor() {
		super();
	}
	equals(item:Item):boolean{
		return item instanceof ItemDynamite;
	}
	public static readonly EXPLODE_SIZE : number = 3
	getExplodeSize():number{
		return ItemDynamite.EXPLODE_SIZE;
	}
}