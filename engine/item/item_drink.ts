import Item from "../item";
import ItemAdapter from "./item_adapter";
import Puzzle from "../../render/puzzle";
import Render from "../../render/render";

export default class ItemDrink extends ItemAdapter {
	constructor() {
		super();
	}

	private static readonly backgroundImagePath: "/drink.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemDrink.backgroundImageId = render.registeredImage(ItemDrink.backgroundImagePath, onSuccess, onError);
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
	getPuzzle(): Puzzle {
		return null;
		//TODO
	}
}
