import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemLeaf extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/leaf.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemLeaf.backgroundImageId = render.registeredImage(ItemLeaf.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemLeaf;
	}
}
