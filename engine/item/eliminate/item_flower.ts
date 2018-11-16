import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemFlower extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/flower.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemFlower.backgroundImageId = render.registeredImage(ItemFlower.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemFlower;
	}
}
