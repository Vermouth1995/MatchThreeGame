import Item from "../item";

import ItemEmpty from "./item_empty";
import ItemDrink from "./item_drink";
import ItemPinecone from "./item_pinecone";

import ItemApple from "./eliminate/item_apple";
import ItemBlueBerry from "./eliminate/item_blueberry";
import ItemFlower from "./eliminate/item_flower";
import ItemLeaf from "./eliminate/item_leaf";
import ItemPear from "./eliminate/item_pear";
import ItemWater from "./eliminate/item_water";

import ItemDynamite from "./boom/item_dynamite";
import ItemFireWork from "./boom/item_firework";
import ItemGrenade from "./boom/item_grenade";
import ItemTrotyl from "./boom/item_trotyl";

export default class ItemCreator {
	static readonly EMPTY: number = 0;

	static readonly DRINK: number = 1;
	static readonly PINECONE: number = 2;

	static readonly APPLE: number = 1000;
	static readonly BLUEBERRY: number = 1001;
	static readonly FLOWER: number = 1002;
	static readonly LEAF: number = 1003;
	static readonly PEAR: number = 1004;
	static readonly WATER: number = 1005;

	static readonly DYNAMITE: number = 2000;
	static readonly FIREWORK: number = 2001;
	static readonly GRENADE: number = 2002;
	static readonly TROTYL: number = 2003;

	static createItem(type: number): Item {
		switch (type) {
			case ItemCreator.EMPTY:
				return ItemEmpty.getEmpty();
			case ItemCreator.APPLE:
				return new ItemApple();
			case ItemCreator.DRINK:
				return new ItemDrink();
			case ItemCreator.PINECONE:
				return new ItemPinecone();
			case ItemCreator.BLUEBERRY:
				return new ItemBlueBerry();
			case ItemCreator.FLOWER:
				return new ItemFlower();
			case ItemCreator.LEAF:
				return new ItemLeaf();
			case ItemCreator.PEAR:
				return new ItemPear();
			case ItemCreator.WATER:
				return new ItemWater();
			case ItemCreator.DYNAMITE:
				return new ItemDynamite();
			case ItemCreator.FIREWORK:
				return new ItemFireWork();
			case ItemCreator.GRENADE:
				return new ItemGrenade();
			case ItemCreator.TROTYL:
				return new ItemTrotyl();
			default:
				return ItemEmpty.getEmpty();
		}
	}
}
