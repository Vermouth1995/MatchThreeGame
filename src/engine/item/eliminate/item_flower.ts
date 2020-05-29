import Item from "../item";
import ItemEliminate from "./item_eliminate";
import Render from "../../../render/render";

export default class ItemFlower extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/flower.png";
	private static imageId: number;
	getImageId(): number {
		return ItemFlower.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemFlower.imageId = render.registeredImage(ItemFlower.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemFlower;
	}
}
