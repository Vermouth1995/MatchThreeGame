import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemTrotyl extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/background.webp";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemTrotyl.backgroundImageId = render.registeredImage(ItemTrotyl.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemTrotyl;
	}
	public static readonly EXPLODE_SIZE: number = 4;
	getExplodeSize(): number {
		return ItemTrotyl.EXPLODE_SIZE;
	}
}
