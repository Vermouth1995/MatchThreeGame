import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemDynamite extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/background.webp";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemDynamite.backgroundImageId = render.registeredImage(ItemDynamite.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemDynamite;
	}
	public static readonly EXPLODE_SIZE: number = 3;
	getExplodeSize(): number {
		return ItemDynamite.EXPLODE_SIZE;
	}
}
