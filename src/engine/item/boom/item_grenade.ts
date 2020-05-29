import Item from "../item";
import ItemBoom from "./item_boom";
import Render from "../../../render/render";

export default class ItemGrenade extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/boom_grenade.png";
	private static imageId: number;
	getImageId(): number {
		return ItemGrenade.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemGrenade.imageId = render.registeredImage(ItemGrenade.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemGrenade;
	}

	static readonly POLYMERIZE_SIZE: number = 5;
	static readonly EXPLODE_SIZE: number = 2.5;
	getExplodeSize(): number {
		return ItemGrenade.EXPLODE_SIZE;
	}
}
