import Coordinate from "../concept/coordinate";
import Puzzle from "./puzzle";

export default interface Render {
	setSize(size: Coordinate): void;
	getSize(): Coordinate;

	registeredImage(image: Blob, onEnd: () => void): number;

	getRootPuzzle(): Puzzle;

	start(): void;
	clear(): void;
	close(): void;

	drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
}
