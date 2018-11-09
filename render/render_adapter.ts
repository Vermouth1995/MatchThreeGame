import Coordinate from "../concept/coordinate";
import LinkedList from "../concept/linked_list/linked_list";
import Render from "./render";
import RenderPuzzle from "./render_puzzle";
import Atom from "../concept/atom/atom";

class RenderAdapterPuzzle {
	constructor(public puzzle: RenderPuzzle, public location: Coordinate, public zIndex: number) {}
}

export default abstract class RenderAdapter implements Render {
	protected size: Coordinate;

	constructor(size: Coordinate) {
		this.setSize(size);
	}

	setSize(size: Coordinate) {
		this.size = size;
	}

	getSize(): Coordinate {
		return this.size;
	}

	protected images: Blob[] = [];

	registeredImage(image: Blob, onEnd: () => void): number {
		let imageId: number = this.images.length;
		this.images.push(image);
		onEnd();
		return imageId;
	}

	protected atoms: LinkedList<Atom> = new LinkedList<Atom>();
	addAtom(imageId: number, location: Coordinate): Atom {
		let atom: Atom = new Atom(imageId, location);
		this.atoms.append(atom);
		return atom;
	}
	removeAtom(atom: Atom) {
		this.atoms.removeBy(function(now: Atom): boolean {
			return atom == now;
		});
	}

	protected puzzles: LinkedList<RenderAdapterPuzzle> = new LinkedList<RenderAdapterPuzzle>();

	addPuzzle(puzzle: RenderPuzzle, location: Coordinate, zIndex: number): number {
		let adapterPuzzle: RenderAdapterPuzzle = new RenderAdapterPuzzle(puzzle, location, zIndex);
		return this.puzzles.insertBy(adapterPuzzle, function(now: RenderAdapterPuzzle): boolean {
			return zIndex < now.zIndex;
		});
	}
	removePuzzle(puzzleId: number) {
		this.puzzles.removeAt(puzzleId);
	}

	start(): void {}

	clear(): void {}

	close(): void {
		this.clear();
	}
}
