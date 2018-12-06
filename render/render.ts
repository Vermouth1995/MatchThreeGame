import Coordinate from "../concept/coordinate";
import Puzzle from "./puzzle";

export default interface Render {
	setSize(size: Coordinate): void;
	getSize(): Coordinate;

	registeredImage(image: string, onEnd: () => void, onError: (error: Error) => void): number;

	getRootPuzzle(): Puzzle;

	start(): void;
	clear(): void;
	close(): void;

	drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
	drawString(text: string, location: Coordinate, size: string, color: string): void;
}
