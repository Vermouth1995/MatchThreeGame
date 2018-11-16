import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemWater extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/water.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemWater.backgroundImageId = render.registeredImage(ItemWater.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemWater;
	}
}
