import Item from "../../item";
import ItemBoom from "../item_boom";
import Render from "../../../render/render";

export default class ItemFireWork extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/background.webp";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemFireWork.backgroundImageId = render.registeredImage(ItemFireWork.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemFireWork;
	}
	public static readonly EXPLODE_SIZE: number = 1;
	getExplodeSize(): number {
		return ItemFireWork.EXPLODE_SIZE;
	}
}
