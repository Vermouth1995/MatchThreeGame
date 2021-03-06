import Color from "../concept/style/color";
import Font from "../concept/style/font";
import Coordinate from "../concept/coordinate/coordinate";
import Puzzle from "./puzzle";
import Listener from "../concept/listener/listener";

export default interface Render {
	setSize(size: Coordinate): void;
	getSize(): Coordinate;
	readonly onResize: Listener<void, () => void>;

	registeredImage(image: string, onEnd: () => void, onError: (error: Error) => void): number;

	getRootPuzzle(): Puzzle;

	start(): void;
	clear(): void;
	close(): void;

	drawImage(imageId: number, location: Coordinate, size: Coordinate): void;
	drawString(text: string, location: Coordinate, font: Font, color: Color): void;
}
