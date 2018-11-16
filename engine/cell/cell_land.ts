import CellAdapter from "./cell_adapter";
import Item from "../item";
import Cell from "../cell";
import CellEmpty from "./cell_empty";
import ItemEmpty from "../item/item_empty";
import Render from "../../render/render";

export default class CellLand extends CellAdapter {
	constructor() {
		super();
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
	clicked(onEnd: () => void) {
		this.item.clicked(onEnd);
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

	private static readonly backgroundImagePath: string = "/cell_land.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		CellLand.backgroundImageId = render.registeredImage(CellLand.backgroundImagePath, onSuccess, onError);
	}
	getBackgroundImageId(): number {
		return CellLand.backgroundImageId;
	}
}
