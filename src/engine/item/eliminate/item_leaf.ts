import Item from "../item";
import ItemEliminate from "./item_eliminate";
import Render from "../../../render/render";

export default class ItemLeaf extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/leaf.png";
	private static imageId: number;
	getImageId(): number {
		return ItemLeaf.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemLeaf.imageId = render.registeredImage(ItemLeaf.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemLeaf;
	}
}
