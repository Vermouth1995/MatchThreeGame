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
	bePolymerizedAsOwner(size: number, onEnd: () => void) {
		let owner: ItemOwner = this.owner;
		this.cleared(function() {
			let boom: Item = ItemCreator.createBoom(size);

			if (boom != null) {
				boom.created(function() {});
				owner.setItem(boom);
			}
			onEnd();
		});
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		this.cleared(onEnd);
	}
	beExploded(onEnd: () => void) {
		this.cleared(onEnd);
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
	abstract getImageId(): number;
}
