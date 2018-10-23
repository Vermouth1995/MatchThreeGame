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
	abstract polymerizedAsOwner(size: number,onEnd: () => void);
	abstract polymerizedAsGuest(onEnd: () => void);
	abstract exploded(onEnd: () => void);
	abstract scraped(onEnd: () => void);
	// self funcs
	cleared(onEnd: () => void) {
		if (this.owner != null) {
			this.owner.clearMe(onEnd);
		}
	}
}
