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

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	abstract getExplodeSize(): number;
	exploded(onEnd: () => void) {
		this.boom(onEnd);
	}
	scraped(onEnd: () => void) {
		onEnd();
	}

	clicked(onEnd: () => void) {
		this.exploded(onEnd);
	}

	private boom(onEnd: () => void) {
		let self: ItemBoom = this;
		let owner: ItemOwner = this.owner;
		this.cleared(function() {
			owner.explode(self.getExplodeSize(), onEnd);
		});
	}

	exchanged(onEnd: () => void): boolean {
		this.boom(onEnd);
		return true;
	}

	abstract getImageId(): number;
}
