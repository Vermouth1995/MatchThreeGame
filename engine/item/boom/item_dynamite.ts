import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemDynamite extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/boom_dynamite.png";
	private static imageId: number;
	getImageId(): number {
		return ItemDynamite.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemDynamite.imageId = render.registeredImage(ItemDynamite.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemDynamite;
	}
	public static readonly EXPLODE_SIZE: number = 3;
	getExplodeSize(): number {
		return ItemDynamite.EXPLODE_SIZE;
	}
}
