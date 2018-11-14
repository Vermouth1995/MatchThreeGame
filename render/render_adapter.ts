import Coordinate from "../concept/coordinate";
import Render from "./render";
import Puzzle from "./puzzle";

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

	protected rootPuzzle: Puzzle = new Puzzle();

	getRootPuzzle(): Puzzle {
		return this.rootPuzzle;
	}

	start(): void {}

	clear(): void {}

	close(): void {
		this.clear();
		this.images = [];
		this.rootPuzzle = new Puzzle();
	}

	draw(timeStamp: number) {
		let self: RenderAdapter = this;
		this.clear();
		//TODO
	}

	abstract drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
}
