import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemApple extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/apple.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemApple.backgroundImageId = render.registeredImage(ItemApple.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemApple;
	}
}
