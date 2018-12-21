import Puzzle from "../render/puzzle";
export default interface Level {
	getPuzzle(): Puzzle;
	setName(name: string): void;
	onEnd(listener: (success: boolean) => void): void;
}
