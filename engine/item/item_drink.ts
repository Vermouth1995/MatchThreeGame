import Item from "../item";
import ItemAdapter from "./item_adapter";
import Render from "../../render/render";

export default class ItemDrink extends ItemAdapter {
	constructor() {
		super();
	}

	private static readonly imagePath: string = "/drink.png";
	private static imageId: number;
	getImageId(): number {
		return ItemDrink.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemDrink.imageId = render.registeredImage(ItemDrink.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemDrink;
	}
	canPolymerize(): boolean {
		return false;
	}

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	exploded(onEnd: () => void) {
		onEnd();
	}
	scraped(onEnd: () => void) {
		onEnd();
	}
	clicked(onEnd: () => void) {
		onEnd();
	}
	exchanged(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
}
