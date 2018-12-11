import Item from "../item";
import ItemAdapter from "./item_adapter";
import ItemOwner from "../item_owner";

export default abstract class ItemBoom extends ItemAdapter {
	constructor() {
		super();
	}

	abstract equals(item: Item): boolean;
	canPolymerize(): boolean {
		return false;
	}

	bePolymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	abstract getExplodeSize(): number;
	beExploded(onEnd: () => void) {
		this.boom(onEnd);
	}
	beScraped(onEnd: () => void) {
		onEnd();
	}

	beClicked(onEnd: () => void): boolean {
		this.boom(onEnd);
		return true;
	}

	private boom(onEnd: () => void) {
		let self: ItemBoom = this;
		let owner: ItemOwner = this.owner;
		this.cleared(function() {
			owner.exploded(self.getExplodeSize(), onEnd);
		});
	}

	beExchanged(onEnd: () => void): boolean {
		this.boom(onEnd);
		return true;
	}

	abstract getImageId(): number;
}
