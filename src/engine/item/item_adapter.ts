import Item from "./item";
import ItemOwner from "./item_owner";
import Puzzle from "../../render/puzzle";
import Atom from "../../render/atom/atom";
import AtomImage from "../../render/atom/atom_image";
import Coordinate from "../../concept/coordinate";
import Locus from "../../concept/locus";
import EventMove from "../../concept/event/event_move";
import EventLocationSetter from "../../concept/event/event_location_setter";

export default abstract class ItemAdapter implements Item {
	constructor() {
		this.puzzle = new Puzzle();
		this.puzzle.setSize(Coordinate.UNIT);
		this.atom = new AtomImage(new Locus<number>(this.getImageId()), this.atomImageSize);
		this.puzzle.addAtom(this.atom, this.atomImageLocation, 0);
	}

	static readonly DrawCoefficient = new Coordinate(0.85, 0.7);
	static readonly DrawStart = Coordinate.UNIT.offset(ItemAdapter.DrawCoefficient.negative()).swell(Coordinate.HALF);
	static readonly DrawImageSize = Coordinate.UNIT.swell(ItemAdapter.DrawCoefficient);
	static readonly CreatedTimeCost: number = 150;
	static readonly ClearedTimeCost: number = 150;

	protected atomImageSize: Locus<Coordinate> = new Locus<Coordinate>(ItemAdapter.DrawImageSize);
	protected atomImageLocation: Locus<Coordinate> = new Locus<Coordinate>(ItemAdapter.DrawStart);
	protected owner: ItemOwner;

	private puzzle: Puzzle;
	private atom: Atom;

	setOwner(owner: ItemOwner) {
		this.owner = owner;
	}

	abstract equals(item: Item): boolean;
	abstract canPolymerize(): boolean;

	abstract bePolymerizedAsOwner(size: number, onEnd: () => void): void;
	abstract bePolymerizedAsGuest(onEnd: () => void): void;
	abstract beExploded(onEnd: () => void): void;
	abstract beScraped(onEnd: () => void): void;
	abstract beClicked(onEnd: () => void): boolean;
	abstract beExchanged(onEnd: () => void): boolean;
	abstract getImageId(): number;

	cleared(onEnd: () => void) {
		this.atomImageSize.setEvent(
			new EventMove<Coordinate>(
				Coordinate.ORIGIN,
				ItemAdapter.ClearedTimeCost,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);
		this.atomImageLocation.setEvent(
			new EventMove<Coordinate>(
				Coordinate.HALF,
				ItemAdapter.ClearedTimeCost,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);

		if (this.owner != null) {
			this.owner.itemCleared(this);
		}
		setTimeout(() => {
			if (this.owner != null) {
				this.owner.itemClearedAnimationEnd(this);
			}
			onEnd();
		}, ItemAdapter.ClearedTimeCost);
	}

	created(onEnd: () => void) {
		this.atomImageSize.setEvent(new EventLocationSetter<Coordinate>(Coordinate.ORIGIN));
		this.atomImageLocation.setEvent(new EventLocationSetter<Coordinate>(Coordinate.HALF));
		this.atomImageSize.setEvent(
			new EventMove<Coordinate>(
				ItemAdapter.DrawImageSize,
				ItemAdapter.CreatedTimeCost,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);
		this.atomImageLocation.setEvent(
			new EventMove<Coordinate>(
				ItemAdapter.DrawStart,
				ItemAdapter.CreatedTimeCost,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);
		if (this.owner != null) {
			this.owner.itemCreated(this);
		}
		setTimeout(() => {
			if (this.owner != null) {
				this.owner.itemCreatedAnimationEnd(this);
			}
			onEnd();
		}, ItemAdapter.CreatedTimeCost);
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	isEmpty(): boolean {
		return false;
	}
}
