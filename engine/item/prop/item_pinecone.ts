import Item from "../item";
import ItemAdapter from "../item_adapter";
import Render from "../../../render/render";

export default class ItemPinecone extends ItemAdapter {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/pinecone.png";
	private static imageId: number;
	getImageId(): number {
		return ItemPinecone.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemPinecone.imageId = render.registeredImage(ItemPinecone.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemPinecone;
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
		this.cleared(onEnd);
	}
	beScraped(onEnd: () => void) {
		this.cleared(onEnd);
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
