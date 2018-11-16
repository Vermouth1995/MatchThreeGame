import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemBlueBerry extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/blueberry.png";
	private static imageId: number;
	getImageId(): number {
		return ItemBlueBerry.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemBlueBerry.imageId = render.registeredImage(ItemBlueBerry.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemBlueBerry;
	}
}
