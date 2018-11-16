import Render from "../render/render";
import OnceLast from "../concept/once/once_last";
import Item from "./item";

import ItemEmpty from "./item/item_empty";
import ItemDrink from "./item/item_drink";
import ItemPinecone from "./item/item_pinecone";

import ItemApple from "./item/eliminate/item_apple";
import ItemBlueBerry from "./item/eliminate/item_blueberry";
import ItemFlower from "./item/eliminate/item_flower";
import ItemLeaf from "./item/eliminate/item_leaf";
import ItemPear from "./item/eliminate/item_pear";
import ItemWater from "./item/eliminate/item_water";

import ItemDynamite from "./item/boom/item_dynamite";
import ItemFireCracker from "./item/boom/item_firecracker";
import ItemGrenade from "./item/boom/item_grenade";
import ItemTrotyl from "./item/boom/item_trotyl";

export default class ItemCreator {
	static readonly EMPTY: number = 0;

	static readonly DRINK: number = 1;
	static readonly PINECONE: number = 2;

	static readonly APPLE: number = 100;
	static readonly BLUEBERRY: number = 101;
	static readonly FLOWER: number = 102;
	static readonly LEAF: number = 103;
	static readonly PEAR: number = 104;
	static readonly WATER: number = 105;

	static readonly DYNAMITE: number = 200;
	static readonly FIRECRACKER: number = 201;
	static readonly GRENADE: number = 202;
	static readonly TROTYL: number = 203;

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
			case ItemCreator.FIRECRACKER:
				return new ItemFireCracker();
			case ItemCreator.GRENADE:
				return new ItemGrenade();
			case ItemCreator.TROTYL:
				return new ItemTrotyl();
			default:
				return ItemEmpty.getEmpty();
		}
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		let success: OnceLast = new OnceLast();
        success.setCallback(onSuccess);
		ItemApple.LoadStaticResource(render, success.getCallback(), onError);
		ItemDrink.LoadStaticResource(render, success.getCallback(), onError);
		ItemPinecone.LoadStaticResource(render, success.getCallback(), onError);
		ItemBlueBerry.LoadStaticResource(render, success.getCallback(), onError);
		ItemFlower.LoadStaticResource(render, success.getCallback(), onError);
		ItemLeaf.LoadStaticResource(render, success.getCallback(), onError);
		ItemPear.LoadStaticResource(render, success.getCallback(), onError);
		ItemWater.LoadStaticResource(render, success.getCallback(), onError);
		ItemDynamite.LoadStaticResource(render, success.getCallback(), onError);
		ItemFireCracker.LoadStaticResource(render, success.getCallback(), onError);
		ItemGrenade.LoadStaticResource(render, success.getCallback(), onError);
		ItemTrotyl.LoadStaticResource(render, success.getCallback(), onError);
	}
}
