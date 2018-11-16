import Item from "../../item";
import ItemEliminate from "../item_eliminate";
import Render from "../../../render/render";

export default class ItemBlueBerry extends ItemEliminate {
	constructor() {
		super();
	}
	private static readonly backgroundImagePath: "/blueberry.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemBlueBerry.backgroundImageId = render.registeredImage(ItemBlueBerry.backgroundImagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemBlueBerry;
	}
}
