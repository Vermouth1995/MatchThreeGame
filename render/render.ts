import Coordinate from "../concept/coordinate";
import Atom from "../concept/atom/atom";
import RenderPuzzle from "./render_puzzle";

export default interface Render {
	setSize(size: Coordinate): void;
	getSize(): Coordinate;

	registeredImage(image: Blob, onEnd: () => void): number;

	addAtom(imageId: number, loc: Coordinate): Atom;
	removeAtom(atom: Atom): void;

	addPuzzle(puzzle: RenderPuzzle, location: Coordinate): number;
	addRemove(puzzleId: number): void;

	start(): void;
	clear(): void;
	close(): void;
}
