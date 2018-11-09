import Coordinate from "../concept/coordinate";

export default interface RenderPuzzle {
	renderClick(location: Coordinate): void;

	renderExchange(from: Coordinate, to: Coordinate): void;

	renderSize(): Coordinate;

	renderClear(): void;
}
