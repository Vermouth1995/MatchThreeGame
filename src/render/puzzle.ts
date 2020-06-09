import Locus from "../concept/coordinate/locus";
import Coordinate from "../concept/coordinate/coordinate";
import Atom from "./atom/atom";
import LinkedList from "../concept/linked_list/linked_list";
import RenderPosition from "./render_position";
import RenderLocus from "./render_locus";

export default class Puzzle {
	private locationEventListener: { [key: number]: (location: Coordinate) => boolean } = {};

	private triggerLocationEvent(eventName: number, location: Coordinate, timeStamp: number): void {
		const listener: (location: Coordinate) => boolean = this.locationEventListener[eventName];
		let isContinue: boolean = true;
		if (listener != null) {
			isContinue = listener(location);
		}
		if (!isContinue) {
			return;
		}

		const child: RenderPosition<Puzzle> = this.triggerChild(location, timeStamp);
		if (child == null) {
			return;
		}
		child.data.triggerLocationEvent(eventName, location.offset(child.location.negative()), timeStamp);
	}

	private onLocationEvent(eventName: number, clickListener: (location: Coordinate) => boolean) {
		this.locationEventListener[eventName] = clickListener;
	}

	private static readonly MouseDown: number = 1;
	private static readonly MouseUp: number = 2;
	private static readonly MouseMove: number = 3;

	triggerMouseDown(location: Coordinate, timeStamp: number): void {
		this.triggerLocationEvent(Puzzle.MouseDown, location, timeStamp);
	}

	onMouseDown(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseDown, clickListener);
	}

	triggerMouseUp(location: Coordinate, timeStamp: number): void {
		this.triggerLocationEvent(Puzzle.MouseUp, location, timeStamp);
	}

	onMouseUp(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseUp, clickListener);
	}

	triggerMouseMove(location: Coordinate, timeStamp: number): void {
		this.triggerLocationEvent(Puzzle.MouseMove, location, timeStamp);
	}

	onMouseMove(clickListener: (location: Coordinate) => boolean) {
		this.onLocationEvent(Puzzle.MouseMove, clickListener);
	}

	children(): LinkedList<RenderLocus<Puzzle>> {
		return this.puzzles;
	}

	allAtoms(): LinkedList<RenderLocus<Atom>> {
		return this.atoms;
	}

	protected atoms: LinkedList<RenderLocus<Atom>> = new LinkedList<RenderLocus<Atom>>();

	addAtom(atom: Atom, locus: Locus<Coordinate>, zIndex: number) {
		if (atom == null) {
			return;
		}
		this.atoms.insertBy(
			new RenderLocus<Atom>(atom, locus, zIndex),
			(now: RenderLocus<Atom>) => zIndex < now.zIndex
		);
	}
	removeAtom(atom: Atom) {
		if (atom == null) {
			return;
		}
		this.atoms.removeBy((now: RenderLocus<Atom>) => atom == now.data);
	}

	private puzzles: LinkedList<RenderLocus<Puzzle>> = new LinkedList<RenderLocus<Puzzle>>();

	private triggerChild(location: Coordinate, timestamp: number): RenderPosition<Puzzle> {
		let active: RenderPosition<Puzzle> = null;
		this.puzzles.iterate((_: number, now: RenderLocus<Puzzle>) => {
			const postion: RenderPosition<Puzzle> = now.getPostion(timestamp);
			if (location.isIn(postion.location, postion.location.offset(now.data.size()))) {
				active = postion;
			}
		});
		return active;
	}

	addChild(puzzle: Puzzle, locus: Locus<Coordinate>, zIndex: number) {
		if (puzzle == null) {
			return;
		}
		this.puzzles.insertBy(
			new RenderLocus<Puzzle>(puzzle, locus, zIndex),
			(now: RenderLocus<Puzzle>) => zIndex < now.zIndex
		);
	}

	removeChild(puzzle: Puzzle) {
		if (puzzle == null) {
			return;
		}
		this.puzzles.removeBy((now: RenderLocus<Puzzle>) => puzzle == now.data);
	}

	private renderSize: Coordinate = Coordinate.ORIGIN;

	setSize(size: Coordinate) {
		this.renderSize = size;
	}

	size(): Coordinate {
		return this.renderSize;
	}

	private showState: boolean = true;

	hide() {
		this.showState = false;
	}

	show() {
		this.showState = true;
	}

	isShow(): boolean {
		return this.showState;
	}

	payAtoms(timeStamp: number, baseIndex: number, baseLocation: Coordinate, atoms: RenderPosition<Atom>[]) {
		if (!this.isShow()) {
			return;
		}
		this.atoms.iterate((_: number, now: RenderLocus<Atom>) => {
			const postion: RenderPosition<Atom> = now
				.getPostion(timeStamp)
				.offsetLocation(baseLocation)
				.offsetZIndex(baseIndex);
			atoms.push(postion);
		});
		this.puzzles.iterate((_: number, now: RenderLocus<Puzzle>) => {
			const postion: RenderPosition<Puzzle> = now
				.getPostion(timeStamp)
				.offsetLocation(baseLocation)
				.offsetZIndex(baseIndex);
			now.data.payAtoms(timeStamp, postion.zIndex, postion.location, atoms);
		});
	}
}
