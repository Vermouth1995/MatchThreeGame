import Item from "../item";
import ItemOwner from "../item_owner";
import Puzzle from "../../render/puzzle";
import Atom from "../../render/atom";
import AtomImage from "../../render/atom/atom_image";
import Coordinate from "../../concept/coordinate";

export default abstract class ItemAdapter implements Item {
	constructor() {
		this.puzzle = new Puzzle();
		this.atom = new AtomImage(this.getImageId(), Coordinate.UNIT, Coordinate.ORIGIN);
		this.puzzle.addAtom(this.atom, Coordinate.ORIGIN, 0);
	}

	protected owner: ItemOwner;

	private puzzle: Puzzle;

	private atom: Atom;

	setOwner(owner: ItemOwner) {
		this.owner = owner;
	}

	// state funcs
	abstract equals(item: Item): boolean;
	abstract canPolymerize(): boolean;

	// action funcs
	abstract polymerizedAsOwner(size: number, onEnd: () => void): void;
	abstract polymerizedAsGuest(onEnd: () => void): void;
	abstract exploded(onEnd: () => void): void;
	abstract scraped(onEnd: () => void): void;
	abstract clicked(onEnd: () => void): void;

	// self funcs
	cleared(onEnd: () => void) {
		if (this.owner != null) {
			this.owner.clearMe(onEnd);
		}
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
	abstract getImageId(): number;
}
