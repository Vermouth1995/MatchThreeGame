import Cell from "../cell";
import CellEmpty from "./cell_empty";
import CellOwner from "../cell_owner";
import Puzzle from "../../render/puzzle";
import Atom from "../../render/atom";
import AtomImage from "../../render/atom/atom_image";
import Coordinate from "../../concept/coordinate";
import Locus from "../../concept/locus";
import EventMove from "../../concept/event/event_move";
import EventLocationSetter from "../../concept/event/event_location_setter";
import ItemEmpty from "../item/item_empty";
import Item from "../item";

export default abstract class CellAdapter implements Cell {
	constructor() {
		this.puzzle = new Puzzle();
		this.puzzle.setSize(CellAdapter.RENDER_SIZE);
		this.atom = new AtomImage(this.getBackgroundImageId(), new Locus(CellAdapter.RENDER_SIZE));
		this.puzzle.addAtom(this.atom, new Locus(Coordinate.ORIGIN), 0);
	}
	isEmpty(): boolean {
		return false;
	}
	static readonly RENDER_SIZE: Coordinate = Coordinate.UNIT;

	static readonly PUZZLE_ITEM_Z_INDEX: number = 10;

	private puzzle: Puzzle;

	private atom: Atom;

	protected owner: CellOwner;

	setOwner(owner: CellOwner) {
		this.owner = owner;
	}

	protected item: Item;

	protected itemLocus: Locus;

	renderSaveBack(where: Coordinate, when: number) {
		let fromSetter: EventLocationSetter = new EventLocationSetter(where);
		this.itemLocus.setEvent(fromSetter);
		let move: EventMove = new EventMove(Coordinate.ORIGIN, when);
		this.itemLocus.setEvent(move);
	}

	getItem(): Item {
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		return this.item;
	}

	popItem(): Item {
		this.timeUpdate();
		if (this.item == null) {
			return ItemEmpty.getEmpty();
		}
		let item = this.item;
		this.puzzle.removeChild(item.getPuzzle());
		this.item.setOwner(null);
		this.item = null;
		this.itemLocus = null;
		return item;
	}

	setItem(item: Item) {
		this.timeUpdate();
		this.itemLocus = new Locus(Coordinate.ORIGIN);
		this.getPuzzle().addChild(item.getPuzzle(), this.itemLocus, CellAdapter.PUZZLE_ITEM_Z_INDEX);
		this.item = item;
		if (item != null) {
			this.item.setOwner(this);
		}
	}

	onItemClear(item: Item) {
		if (item == this.item) {
			this.timeUpdate();
			this.item = null;
			this.itemLocus = null;
		}
	}

	onItemClearAnimationEnd(item: Item) {
		this.puzzle.removeChild(item.getPuzzle());
	}

	onItemCreate(item: Item) {}

	onItemCreateAnimationEnd(item: Item) {}

	abstract canRobbed(): boolean;
	abstract canExchange(): boolean;

	polymerizedAsOwner(size: number, onEnd: () => void) {
		this.getItem().polymerizedAsOwner(size, onEnd);
	}
	polymerizedAsGuest(onEnd: () => void) {
		this.getItem().polymerizedAsGuest(onEnd);
	}
	exploded(onEnd: () => void) {
		this.getItem().exploded(onEnd);
	}
	scraped(onEnd: () => void) {
		this.getItem().scraped(onEnd);
	}
	clicked(onEnd: () => void) {
		this.getItem().clicked(onEnd);
	}

	static readonly ROB_SAVE_BACK_TIME_COST = 120;
	static readonly EXCHANGE_SAVE_BACK_TIME_COST = 200;

	rob(victims: Cell[], victimLocations: Coordinate[], onEnd: () => void): boolean {
		let self: CellAdapter = this;
		if (!this.getItem().isEmpty()) {
			onEnd();
			return false;
		}
		let validVictim: Cell = CellEmpty.getEmpty();
		let validVictimLocation: Coordinate;
		for (let i = 0; i < victims.length; i++) {
			let victim: Cell = victims[i];
			if (victim.canRobbed()) {
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
		self.renderSaveBack(validVictimLocation, CellAdapter.ROB_SAVE_BACK_TIME_COST);
		setTimeout(function() {
			onEnd();
		}, CellAdapter.ROB_SAVE_BACK_TIME_COST);

		return true;
	}

	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean {
		if (!this.canExchange() || !to.canExchange()) {
			onEnd();
			return false;
		}
		let from: Cell = this;
		let fromItem: Item = from.popItem();
		let toItem: Item = to.popItem();

		from.setItem(toItem);
		to.setItem(fromItem);

		from.renderSaveBack(offset, CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);
		to.renderSaveBack(offset.negative(), CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);

		setTimeout(onEnd, CellAdapter.EXCHANGE_SAVE_BACK_TIME_COST);

		return true;
	}
	explode(size: number, onEnd: () => void) {
		this.owner.explode(this, size, onEnd);
	}

	private updateTime: number = 0;

	getUpdateTime(): number {
		return this.updateTime;
	}

	protected timeUpdate() {
		this.updateTime = Date.now();
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
	abstract getBackgroundImageId(): number;
}
