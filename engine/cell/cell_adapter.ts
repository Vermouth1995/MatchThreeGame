import Cell from "../cell";
import Item from "../item";
import CellOwner from "../cell_owner";
import Puzzle from "../../render/puzzle";
import Atom from "../../render/atom";
import AtomImage from "../../render/atom/atom_image";
import Coordinate from "../../concept/coordinate";
import ItemEmpty from "../item/item_empty";

export default abstract class CellAdapter implements Cell {
	constructor() {
		this.puzzle = new Puzzle();
		this.puzzle.setSize(CellAdapter.RENDER_SIZE);
		this.atom = new AtomImage(this.getBackgroundImageId(), CellAdapter.RENDER_SIZE, Coordinate.ORIGIN);
		this.puzzle.addAtom(this.atom, Coordinate.ORIGIN, 0);
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
		let item = this.item;
		this.puzzle.removeChild(item.getPuzzle());
		this.item.setOwner(null);
		this.item = null;
		return item;
	}

	setItem(item: Item) {
		this.getPuzzle().addChild(item.getPuzzle(), Coordinate.ORIGIN, CellAdapter.PUZZLE_ITEM_Z_INDEX);
		this.item = item;
		if (item != null) {
			this.item.setOwner(this);
		}
	}

	clearMe(onEnd: () => void) {
		if (this.item != null) {
			this.puzzle.removeChild(this.item.getPuzzle());
			this.item.setOwner(null);
		}
		this.item = null;
		onEnd();
	}

	abstract canRobbed(): boolean;
	abstract canExchange(): boolean;

	abstract polymerizedAsOwner(size: number, onEnd: () => void): void;
	abstract polymerizedAsGuest(onEnd: () => void): void;
	abstract exploded(onEnd: () => void): void;
	abstract scraped(onEnd: () => void): void;
	abstract clicked(onEnd: () => void): void;

	abstract rob(victims: Cell[], onEnd: () => void): boolean;
	abstract exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean;

	explode(size: number, onEnd: () => void) {
		this.owner.explode(this, size, onEnd);
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
	abstract getBackgroundImageId(): number;
}
