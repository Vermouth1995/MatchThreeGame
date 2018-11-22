import Item from "../item";
import ItemAdapter from "./item_adapter";
import ItemOwner from "../item_owner";
import ItemCreator from "../item_creator";

export default abstract class ItemEliminate extends ItemAdapter {
	constructor() {
		super();
	}

	abstract equals(item: Item): boolean;
	canPolymerize(): boolean {
		return true;
	}

	public static readonly BOOM_GENERATE_RADIX: number = 3;
	polymerizedAsOwner(size: number, onEnd: () => void) {
		let owner: ItemOwner = this.owner;
		this.cleared(function() {
			let boom: Item = ItemCreator.createBoom(size);
			if (boom != null) {
				owner.setItem(boom);
			}
			onEnd();
		});
	}
	polymerizedAsGuest(onEnd: () => void) {
		this.cleared(onEnd);
	}
	exploded(onEnd: () => void) {
		this.cleared(onEnd);
	}
	scraped(onEnd: () => void) {
		onEnd();
	}
	clicked(onEnd: () => void) {
		onEnd();
	}
	abstract getImageId(): number;
}
