import Item from "../item";
import ItemAdapter from "./item_adapter";
import Puzzle from "../../render/puzzle";
import Render from "../../render/render";

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

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	exploded(onEnd: () => void) {
		this.cleared(onEnd);
	}
	scraped(onEnd: () => void) {
		this.cleared(onEnd);
	}
	clicked(onEnd: () => void) {
		onEnd();
	}
	getPuzzle(): Puzzle {
		return null;
		//TODO
	}
}
