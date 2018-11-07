import Coordinate from "../concept/coordinate";
import LinkedList from "../concept/linked_list/linked_list";
import Render from "./render";
import RenderPuzzle from "./render_puzzle";
import Atom from "../concept/atom/atom";

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
		this.atoms.remove(atom);
	}
	abstract start(): void;

	clear() {
		// TODO
	}

	abstract close(): void;

	addPuzzle(puzzle: RenderPuzzle, location: Coordinate): number {
		return 0;
		//TODO
	}
	addRemove(puzzleId: number): void {
		//TODO
	}
}
