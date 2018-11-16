import Coordinate from "../concept/coordinate";
import Atom from "./atom";
import LinkedList from "../concept/linked_list/linked_list";
import RenderPosition from "./render_position";

export default class Puzzle {
	triggerClick(location: Coordinate): void {
		if (this.clickListener != null) {
			let isContinue: boolean = this.clickListener(location);
			if (!isContinue) {
				return;
			}
		}
		let child: RenderPosition<Puzzle> = this.triggerChild(location);
		if (child == null) {
			return;
		}
		child.data.triggerClick(location.offset(child.location.negative()));
	}

	private clickListener: (location: Coordinate) => boolean = null;

	onClick(clickListener: (location: Coordinate) => boolean) {
		this.clickListener = clickListener;
	}

	triggerExchange(from: Coordinate, to: Coordinate): void {
		if (this.exchangeListener != null) {
			let isContinue: boolean = this.exchangeListener(from, to);
			if (!isContinue) {
				return;
			}
		}
		let child: RenderPosition<Puzzle> = this.triggerChild(from);
		if (child == null) {
			return;
		}
		if (!to.isIn(child.location, child.location.offset(child.data.size()))) {
			return;
		}
		child.data.triggerExchange(from.offset(child.location.negative()), to.offset(child.location.negative()));
	}

	private exchangeListener: (from: Coordinate, to: Coordinate) => boolean = null;

	onExchange(exchangeListener: (from: Coordinate, to: Coordinate) => boolean) {
		this.exchangeListener = exchangeListener;
	}

	children(): LinkedList<RenderPosition<Puzzle>> {
		return this.puzzles;
	}

	allAtoms(): LinkedList<RenderPosition<Atom>> {
		return this.atoms;
	}

	protected atoms: LinkedList<RenderPosition<Atom>> = new LinkedList<RenderPosition<Atom>>();
	addAtom(atom: Atom, location: Coordinate, zIndex: number) {
		this.atoms.insertBy(new RenderPosition<Atom>(atom, location, zIndex), function(
			now: RenderPosition<Atom>
		): boolean {
			return zIndex < now.zIndex;
		});
	}
	removeAtom(atom: Atom) {
		this.atoms.removeBy(function(now: RenderPosition<Atom>): boolean {
			return atom == now.data;
		});
	}

	private puzzles: LinkedList<RenderPosition<Puzzle>> = new LinkedList<RenderPosition<Puzzle>>();

	private triggerChild(location: Coordinate): RenderPosition<Puzzle> {
		let active: RenderPosition<Puzzle> = null;
		this.puzzles.iterate(function(index: number, now: RenderPosition<Puzzle>) {
			if (location.isIn(now.location, now.location.offset(now.data.size()))) {
				active = now;
			}
		});
		return active;
	}

	addChild(puzzle: Puzzle, location: Coordinate, zIndex: number) {
		this.puzzles.insertBy(new RenderPosition<Puzzle>(puzzle, location, zIndex), function(
			now: RenderPosition<Puzzle>
		): boolean {
			return zIndex < now.zIndex;
		});
	}

	removeChild(puzzle: Puzzle) {
		this.puzzles.removeBy(function(now: RenderPosition<Puzzle>): boolean {
			return puzzle == now.data;
		});
	}

	private renderSize: Coordinate = Coordinate.ORIGIN;

	setSize(size: Coordinate) {
		this.renderSize = size;
	}

	size(): Coordinate {
		return this.renderSize;
	}

	payAtoms(baseIndex: number, atoms: RenderPosition<Atom>[]) {
		this.atoms.iterate(function(index: number, now: RenderPosition<Atom>) {
			atoms.push(new RenderPosition<Atom>(now.data, now.location, now.zIndex + baseIndex));
		});
		this.puzzles.iterate(function(index: number, now: RenderPosition<Puzzle>) {
			now.data.payAtoms(baseIndex + now.zIndex, atoms);
		});
	}
}
