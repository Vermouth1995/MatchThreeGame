import Cell from "../cell/cell";
import CellEmpty from "./cell_empty";
import Item from "../item/item";
import ItemCreator from "../item/item_creator";
import ItemEmpty from "../item/prop/item_empty";
import CellOwner from "./cell_owner";
import CoordinateValue from "../../concept/coordinate/coordinate_value";
import Coordinate from "../../concept/coordinate/coordinate";
import Locus from "../../concept/coordinate/locus";
import EventMove from "../../concept/coordinate/event/event_move";
import EventLocationSetter from "../../concept/coordinate/event/event_location_setter";
import Puzzle from "../../render/puzzle";

export default class CellExit implements Cell {
	static readonly RENDER_SIZE: Coordinate = CoordinateValue.UNIT;
	static readonly PUZZLE_ITEM_Z_INDEX: number = 10;
	static readonly ROB_SAVE_BACK_TIME_COST: number = 120;
	static readonly ITEM_TEMPLATE: Item = ItemCreator.createItem(ItemCreator.DRINK);

	constructor() {
		this.puzzle = new Puzzle();
		this.puzzle.setSize(CellExit.RENDER_SIZE);
	}

	private location: Coordinate;

	setLocation(location: Coordinate) {
		this.location = location;
	}

	getLocation(): Coordinate {
		return this.location;
	}

	isEmpty(): boolean {
		return false;
	}

	private owner: CellOwner;

	setOwner(owner: CellOwner) {
		this.owner = owner;
	}

	private puzzle: Puzzle;
	resizePuzzle(size: Coordinate): void {}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
	private item: Item;

	private itemLocus: Locus<Coordinate>;

	getItem(): Item {
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		return this.item;
	}

	popItem(): Item {
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		const item = this.item;
		this.getPuzzle().removeChild(item.getPuzzle());
		this.item.setOwner(null);
		this.item = null;
		this.itemLocus = null;
		return item;
	}

	setItem(item: Item): void {
		this.itemLocus = new Locus(CoordinateValue.ORIGIN);
		this.getPuzzle().addChild(item.getPuzzle(), this.itemLocus, CellExit.PUZZLE_ITEM_Z_INDEX);
		this.item = item;
		if (item != null) {
			this.item.setOwner(this);
		}
	}

	canRobbed(): boolean {
		return false;
	}

	canExchange(): boolean {
		return false;
	}

	bePolymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	bePolymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	beExploded(onEnd: () => void) {
		onEnd();
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

	getUpdateTime(): number {
		return 0;
	}

	renderSaveBack(where: Coordinate, when: number): void {
		const fromSetter: EventLocationSetter<Coordinate> = new EventLocationSetter<Coordinate>(where);
		this.itemLocus.setEvent(fromSetter);
		const move: EventMove<Coordinate> = new EventMove<Coordinate>(
			CoordinateValue.DOWN,
			when,
			false,
			(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
		);
		this.itemLocus.setEvent(move);
		this.item.cleared(() => {});
		this.item = null;
		this.itemLocus = null;
	}

	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	rob(victims: Cell[], victimLocations: Coordinate[], onEnd: () => void): boolean {
		let self = this;
		let validVictim: Cell = CellEmpty.getEmpty();
		let validVictimLocation: Coordinate;
		for (let i = 0; i < victims.length; i++) {
			let victim: Cell = victims[i];
			let item = victim.getItem();
			if (victim.canRobbed() && !item.isEmpty() && CellExit.ITEM_TEMPLATE.equals(item)) {
				validVictim = victim;
				validVictimLocation = victimLocations[i];
				break;
			}
		}
		if (validVictim.isEmpty()) {
			onEnd();
			return false;
		}
		let victimItem: Item = validVictim.popItem();
		if (victimItem.isEmpty()) {
			onEnd();
			return false;
		}
		self.setItem(victimItem);
		self.renderSaveBack(validVictimLocation, CellExit.ROB_SAVE_BACK_TIME_COST);
		setTimeout(() => {
			onEnd();
		}, CellExit.ROB_SAVE_BACK_TIME_COST);

		return true;
	}

	exploded(size: number, onEnd: () => void) {
		onEnd();
	}

	itemCleared(item: Item) {
		if (this.owner != null) {
			this.owner.itemCleared(item);
		}
	}

	itemClearedAnimationEnd(item: Item) {
		this.getPuzzle().removeChild(item.getPuzzle());
	}

	itemCreated(item: Item) {}

	itemCreatedAnimationEnd(item: Item) {}
}
