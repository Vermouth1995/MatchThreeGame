import Item from "../item";
import ItemAdapter from "../item_adapter";
import ItemOwner from "../item_owner";

export default abstract class ItemBoom extends ItemAdapter {
	constructor() {
		super();
	}

	abstract equals(item: Item): boolean;
	abstract getExplodeSize(): number;
	abstract getImageId(): number;

	canPolymerize(): boolean {
		return false;
	}

	bePolymerizedAsOwner(_: number, onEnd: () => void) {
		onEnd();
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
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
	beExchanged(onEnd: () => void): boolean {
		this.boom(onEnd);
		return true;
	}

	private boom(onEnd: () => void) {
		let owner: ItemOwner = this.owner;
		this.cleared(() => {
			owner.exploded(this.getExplodeSize(), onEnd);
		});
	}
}
