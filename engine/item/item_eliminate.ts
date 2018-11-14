import Item from "../item";
import ItemBoom from "./item_boom";
import ItemAdapter from "./item_adapter";
import ItemFireWork from "./boom/item_firework";
import ItemGrenade from "./boom/item_grenade";
import ItemDynamite from "./boom/item_dynamite";
import ItemTrotyl from "./boom/item_trotyl";
import Puzzle from "../../render/puzzle";

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
		let self: ItemEliminate = this;
		this.cleared(function() {
			let boom: ItemBoom = null;
			if (size <= ItemEliminate.BOOM_GENERATE_RADIX) {
				return;
			}
			switch (size - ItemEliminate.BOOM_GENERATE_RADIX) {
				case ItemFireWork.EXPLODE_SIZE:
					boom = new ItemFireWork();
					break;
				case ItemGrenade.EXPLODE_SIZE:
					boom = new ItemGrenade();
					break;
				case ItemDynamite.EXPLODE_SIZE:
					boom = new ItemDynamite();
					break;
				case ItemTrotyl.EXPLODE_SIZE:
					boom = new ItemTrotyl();
					break;
				default:
					boom = new ItemTrotyl();
					break;
			}
			self.owner.setItem(boom);
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
	getPuzzle(): Puzzle {
		return null;
		//TODO
	}
}
