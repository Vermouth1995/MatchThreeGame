import Color from "../concept/style/color";
import Font from "../concept/style/font";
import Coordinate from "../concept/coordinate";
import RenderPosition from "./render_position";
import Render from "./render";
import Puzzle from "./puzzle";
import Atom from "./atom/atom";
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

	registeredImage(image: string, onEnd: () => void, _: (error: Error) => void): number {
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
		this.getRootPuzzle().payAtoms(timeStamp, 0, Coordinate.ORIGIN, atoms);
		atoms.sort((left, right) => left.zIndex - right.zIndex);
		for (let i = 0; i < atoms.length; i++) {
			let atom: RenderPosition<Atom> = atoms[i];
			atom.data.draw(this, atom.location, timeStamp);
		}
	}

	static readonly IMAGE_ID_EMPTY: number = -1;

	abstract drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
	abstract drawString(text: string, location: Coordinate, size: Font, color: Color): void;
}
