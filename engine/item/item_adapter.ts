import Item from "../item";
import ItemOwner from "../item_owner";
import Puzzle from "../../render/puzzle";
import Atom from "../../render/atom";
import AtomImage from "../../render/atom/atom_image";
import Coordinate from "../../concept/coordinate";
import Locus from "../../concept/locus";
import EventMove from "../../concept/event/event_move";
import EventLocationSetter from "../../concept/event/event_location_setter";

export default abstract class ItemAdapter implements Item {
	static readonly DrawCoefficient = new Coordinate(0.85, 0.7);
	static readonly DrawStart = Coordinate.UNIT.offset(ItemAdapter.DrawCoefficient.negative()).swell(Coordinate.HALF);
	static readonly DrawImageSize = Coordinate.UNIT.swell(ItemAdapter.DrawCoefficient);

	static readonly CreatedTimeCost: number = 150;
	static readonly ClearedTimeCost: number = 150;

	constructor() {
		this.puzzle = new Puzzle();
		this.puzzle.setSize(Coordinate.UNIT);
		this.atom = new AtomImage(this.getImageId(), this.atomImageSize);
		this.puzzle.addAtom(this.atom, this.atomImageLocation, 0);
	}

	protected atomImageSize: Locus = new Locus(ItemAdapter.DrawImageSize);
	protected atomImageLocation: Locus = new Locus(ItemAdapter.DrawStart);

	protected owner: ItemOwner;

	private puzzle: Puzzle;

	private atom: Atom;

	setOwner(owner: ItemOwner) {
		this.owner = owner;
	}

	abstract equals(item: Item): boolean;
	abstract canPolymerize(): boolean;

	abstract polymerizedAsOwner(size: number, onEnd: () => void): void;
	abstract polymerizedAsGuest(onEnd: () => void): void;
	abstract exploded(onEnd: () => void): void;
	abstract scraped(onEnd: () => void): void;
	abstract clicked(onEnd: () => void): void;

	cleared(onEnd: () => void) {
		let self: ItemAdapter = this;
		this.atomImageSize.setEvent(new EventMove(Coordinate.ORIGIN, ItemAdapter.ClearedTimeCost));
		this.atomImageLocation.setEvent(new EventMove(Coordinate.HALF, ItemAdapter.ClearedTimeCost));

		if (this.owner != null) {
			this.owner.onItemClear(this);
		}
		setTimeout(function() {
			if (self.owner != null) {
				self.owner.onItemClearAnimationEnd(self);
			}
			onEnd();
		}, ItemAdapter.ClearedTimeCost);
	}

	created(onEnd: () => void) {
		this.atomImageSize.setEvent(new EventLocationSetter(Coordinate.ORIGIN));
		this.atomImageLocation.setEvent(new EventLocationSetter(Coordinate.HALF));

		this.atomImageSize.setEvent(new EventMove(ItemAdapter.DrawImageSize, ItemAdapter.CreatedTimeCost));
		this.atomImageLocation.setEvent(new EventMove(ItemAdapter.DrawStart, ItemAdapter.CreatedTimeCost));

		setTimeout(function() {
			onEnd();
		}, ItemAdapter.CreatedTimeCost);
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}
	abstract getImageId(): number;

	isEmpty(): boolean {
		return false;
	}
}
