import Item from "../item";
import ItemAdapter from "../item_adapter";
import Render from "../../../render/render";

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

	bePolymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	beExploded(onEnd: () => void) {
		onEnd();
	}
	beScraped(onEnd: () => void) {
		onEnd();
	}
	beClicked(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
	beExchanged(onEnd: () => void): boolean {
		onEnd();
		return false;
	}
}
