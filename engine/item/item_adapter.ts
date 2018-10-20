import Item from "../item";
import ItemOwner from "../item_owner";

export default abstract class ItemAdapter implements Item {
	// init funcs
	constructor() {}
	protected owner: ItemOwner;
	setOwner(owner: ItemOwner) {
		this.owner = owner;
	}
	// state funcs
	abstract equals(item: Item): boolean;
	abstract canPolymerize(): boolean;
	// action funcs
	abstract polymerizedAsOwner(size: number);
	abstract polymerizedAsGuest();
	abstract exploded();
	abstract scraped();
	// self funcs
	cleared() {
		if (this.owner != null) {
			this.owner.clearMe();
		}
	}
}
