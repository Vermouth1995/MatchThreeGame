import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemGrenade extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/background.webp";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemGrenade.backgroundImageId = render.registeredImage(ItemGrenade.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemGrenade;
	}
	public static readonly EXPLODE_SIZE: number = 2;
	getExplodeSize(): number {
		return ItemGrenade.EXPLODE_SIZE;
	}
}
