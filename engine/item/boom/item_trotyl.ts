import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemTrotyl extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/boom_trotyl.png";
	private static imageId: number;
	getImageId(): number {
		return ItemTrotyl.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemTrotyl.imageId = render.registeredImage(ItemTrotyl.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemTrotyl;
	}
	public static readonly EXPLODE_SIZE: number = 4;
	getExplodeSize(): number {
		return ItemTrotyl.EXPLODE_SIZE;
	}
}
