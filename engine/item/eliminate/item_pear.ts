import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemPear extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/pear.png";
	private static imageId: number;
	getImageId(): number {
		return ItemPear.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemPear.imageId = render.registeredImage(ItemPear.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemPear;
	}
}
