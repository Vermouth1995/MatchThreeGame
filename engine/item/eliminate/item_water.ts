import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemWater extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/water.png";
	private static imageId: number;
	getImageId(): number {
		return ItemWater.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemWater.imageId = render.registeredImage(ItemWater.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemWater;
	}
}
