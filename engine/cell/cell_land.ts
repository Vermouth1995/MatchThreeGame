import CellAdapter from "./cell_adapter";
import Item from "../item";
import Cell from "../cell";
import CellEmpty from "./cell_empty";
import ItemEmpty from "../item/item_empty";

export default class CellLand extends CellAdapter {
	constructor() {
		super();
	}
	private item: Item;
	getItem(): Item {
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		return this.item;
	}
	setItem(item: Item) {
		this.item = item;
		this.item.setOwner(this);
	}
	clearMe(onEnd: () => void) {
		this.item.setOwner(null);
		this.item = null;
		onEnd();
	}
	canRobbed(): boolean {
		return true;
	}
	canExchange(): boolean {
		return true;
	}

	polymerizedAsOwner(size: number, onEnd: () => void) {
		this.item.polymerizedAsOwner(size, onEnd);
	}
	polymerizedAsGuest(onEnd: () => void) {
		this.item.polymerizedAsGuest(onEnd);
	}
	exploded(onEnd: () => void) {
		this.item.exploded(onEnd);
	}
	scraped(onEnd: () => void) {
		this.item.scraped(onEnd);
	}
	exchange(to: Cell, onEnd: () => void): boolean {
		if (!this.canExchange() || !to.canExchange()) {
			onEnd();
			return false;
		}
		let toItem: Item = to.getItem();
		to.setItem(this.getItem());
		this.setItem(toItem);
		onEnd();
		return true;
	}

	rob(victims: Cell[], onEnd: () => void): boolean {
		let self: CellLand = this;
		if (!ItemEmpty.isEmpty(this.getItem())) {
			onEnd();
			return false;
		}
		let validVictim: Cell = CellEmpty.getEmpty();
		for (let i = 0; i < victims.length; i++) {
			let victim: Cell = victims[i];
			if (victim.canRobbed()) {
				validVictim = victim;
				break;
			}
		}
		if (CellEmpty.isEmpty(validVictim)) {
			onEnd();
			return false;
		}
		let victimItem: Item = validVictim.getItem();
		if (ItemEmpty.isEmpty(victimItem)) {
			onEnd();
			return false;
		}
		validVictim.clearMe(function() {
			self.setItem(victimItem);
			onEnd();
		});

		return true;
	}
}
