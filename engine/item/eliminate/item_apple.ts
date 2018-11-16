import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemApple extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/apple.png";
	private static imageId: number;
	getImageId(): number {
		return ItemApple.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemApple.imageId = render.registeredImage(ItemApple.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemApple;
	}
}
