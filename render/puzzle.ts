import Coordinate from "../concept/coordinate";
import Atom from "./atom";
import LinkedList from "../concept/linked_list/linked_list";
import RenderPosition from "./render_position";

export default class Puzzle {
	private locationEventListener: { [key: number]: (location: Coordinate) => boolean } = {};

	private triggerLocationEvent(eventName: number, location: Coordinate): void {
		let listener: (location: Coordinate) => boolean = this.locationEventListener[eventName];
		let isContinue: boolean = true;
		if (listener != null) {
			isContinue = listener(location);
		}
		if (!isContinue) {
			return;
		}

		let child: RenderPosition<Puzzle> = this.triggerChild(location);
		if (child == null) {
			return;
		}
		child.data.triggerLocationEvent(eventName, location.offset(child.location.negative()));
	}

	private onLocationEvent(eventName: number, clickListener: (location: Coordinate) => boolean) {
		this.locationEventListener[eventName] = clickListener;
	}

	private static readonly MouseDown: number = 1;
	private static readonly MouseUp: number = 2;
	private static readonly MouseMove: number = 3;

	triggerMouseDown(location: Coordinate): void {
		this.triggerLocationEvent(Puzzle.MouseDown, location);
	}

	onMouseDown(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseDown, clickListener);
	}

	triggerMouseUp(location: Coordinate): void {
		this.triggerLocationEvent(Puzzle.MouseUp, location);
	}

	onMouseUp(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseUp, clickListener);
	}

	triggerMouseMove(location: Coordinate): void {
		this.triggerLocationEvent(Puzzle.MouseMove, location);
	}

	onMouseMove(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseMove, clickListener);
	}

	children(): LinkedList<RenderPosition<Puzzle>> {
		return this.puzzles;
	}

	allAtoms(): LinkedList<RenderPosition<Atom>> {
		return this.atoms;
	}

	protected atoms: LinkedList<RenderPosition<Atom>> = new LinkedList<RenderPosition<Atom>>();
	addAtom(atom: Atom, location: Coordinate, zIndex: number) {
		if (atom == null) {
			return;
		}
		this.atoms.insertBy(new RenderPosition<Atom>(atom, location, zIndex), function(
			now: RenderPosition<Atom>
		): boolean {
			return zIndex < now.zIndex;
		});
	}
	removeAtom(atom: Atom) {
		if (atom == null) {
			return;
		}
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
		if (puzzle == null) {
			return;
		}
		this.puzzles.insertBy(new RenderPosition<Puzzle>(puzzle, location, zIndex), function(
			now: RenderPosition<Puzzle>
		): boolean {
			return zIndex < now.zIndex;
		});
	}

	removeChild(puzzle: Puzzle) {
		if (puzzle == null) {
			return;
		}
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

	payAtoms(baseIndex: number, baseLocation: Coordinate, atoms: RenderPosition<Atom>[]) {
		this.atoms.iterate(function(index: number, now: RenderPosition<Atom>) {
			atoms.push(new RenderPosition<Atom>(now.data, baseLocation.offset(now.location), now.zIndex + baseIndex));
		});
		this.puzzles.iterate(function(index: number, now: RenderPosition<Puzzle>) {
			now.data.payAtoms(baseIndex + now.zIndex, baseLocation.offset(now.location), atoms);
		});
	}
}
