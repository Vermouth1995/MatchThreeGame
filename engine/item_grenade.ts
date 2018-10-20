import Item from "./item";
import ItemBoom from "./item_boom";

export default class ItemGrenade extends ItemBoom {
	constructor() {
		super();
	}
	equals(item:Item):boolean{
		return item instanceof ItemGrenade;
	}
	public static readonly EXPLODE_SIZE : number = 2
	getExplodeSize():number{
		return ItemGrenade.EXPLODE_SIZE;
	}
}