import Color from "../concept/style/color";
import Font from "../concept/style/font";
import CoordinateValue from "../concept/coordinate/coordinate_value";
import Coordinate from "../concept/coordinate/coordinate";
import RenderPosition from "./render_position";
import Render from "./render";
import Puzzle from "./puzzle";
import Atom from "./atom/atom";
import OnceAdapter from "../concept/once/once_adapter";
import ListenerDiffusion from "../concept/listener/listener_diffusion";
import Listener from "../concept/listener/listener";

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

	readonly onResize: Listener<void, () => void> = new ListenerDiffusion();

	protected images: string[] = [];

	registeredImage(image: string, onEnd: () => void, _: (error: Error) => void): number {
		const imageId: number = this.images.length;
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
		const atoms: RenderPosition<Atom>[] = [];
		this.getRootPuzzle().payAtoms(timeStamp, 0, CoordinateValue.ORIGIN, atoms);
		atoms.sort((left, right) => left.zIndex - right.zIndex);
		for (let i = 0; i < atoms.length; i++) {
			const atom: RenderPosition<Atom> = atoms[i];
			atom.data.draw(this, atom.location, timeStamp);
		}
	}

	static readonly IMAGE_ID_EMPTY: number = -1;

	abstract drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
	abstract drawString(text: string, location: Coordinate, size: Font, color: Color): void;
}
