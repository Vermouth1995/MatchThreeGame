import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemPear extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/pear.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemPear.backgroundImageId = render.registeredImage(ItemPear.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemPear;
	}
}
