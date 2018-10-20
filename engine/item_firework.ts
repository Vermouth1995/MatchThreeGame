import Item from "./item";
import ItemBoom from "./item_boom";

export default class ItemFireWork extends ItemBoom {
	constructor() {
		super();
	}
	equals(item:Item):boolean{
		return item instanceof ItemFireWork;
	}
	public static readonly EXPLODE_SIZE : number = 1
	getExplodeSize():number{
		return ItemFireWork.EXPLODE_SIZE;
	}
}