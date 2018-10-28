import Item from "../item";
import Coordinate from "../../algorithm/coordinate";
import Birth from "../birth";
import ItemApple from "../item/eliminate/item_apple";
import ItemBlueBerry from "../item/eliminate/item_blueberry";
import ItemFlower from "../item/eliminate/item_flower";
import ItemLeaf from "../item/eliminate/item_leaf";
import ItemPear from "../item/eliminate/item_pear";
import ItemWater from "../item/eliminate/item_water";
import ItemEmpty from "../item/item_empty";

export default abstract class BirthAdapter implements Birth {
	constructor() {}
	abstract getItem(loc: Coordinate): Item;

	static readonly Empty: number = 0;
	static readonly APPLE: number = 10000;
	static readonly BLUEBERRY: number = 10001;
	static readonly FLOWER: number = 10002;
	static readonly LEAF: number = 10003;
	static readonly PEAR: number = 10004;
	static readonly WATER: number = 10005;

	static createItem(type: number): Item {
		switch (type) {
			case BirthAdapter.Empty:
				return ItemEmpty.getEmpty();
			case BirthAdapter.APPLE:
				return new ItemApple();
			case BirthAdapter.BLUEBERRY:
				return new ItemBlueBerry();
			case BirthAdapter.FLOWER:
				return new ItemFlower();
			case BirthAdapter.LEAF:
				return new ItemLeaf();
			case BirthAdapter.PEAR:
				return new ItemPear();
			case BirthAdapter.WATER:
				return new ItemWater();
			default:
				return ItemEmpty.getEmpty();
		}
	}
}
