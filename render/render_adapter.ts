import Coordinate from "../concept/coordinate";
import RenderPosition from "./render_position";
import Render from "./render";
import Puzzle from "./puzzle";
import Atom from "./atom";
import OnceAdapter from "../concept/once/once_adapter";

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

	protected images: string[] = [];

	registeredImage(image: string, onEnd: () => void, onError: (error: Error) => void): number {
		let imageId: number = this.images.length;
		this.images.push(image);
		OnceAdapter.delay(onEnd)();
		return imageId;
	}

	protected rootPuzzle: Puzzle = new Puzzle();

	getRootPuzzle(): Puzzle {
		return this.rootPuzzle;
	}

	start(): void {}

	clear(): void {}

	close(): void {
		this.images = [];
		this.rootPuzzle = new Puzzle();
	}

	draw(timeStamp: number) {
		let atoms: RenderPosition<Atom>[] = [];
		this.getRootPuzzle().payAtoms(0, Coordinate.ORIGIN, atoms);
		atoms.sort(function(left: RenderPosition<Atom>, right: RenderPosition<Atom>): number {
			return left.zIndex - right.zIndex;
		});
		for (let i = 0; i < atoms.length; i++) {
			let atom: RenderPosition<Atom> = atoms[i];
			atom.data.draw(this, timeStamp, atom.location);
		}
	}

	abstract drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
}
