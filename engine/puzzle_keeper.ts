import Puzzle from "../render/puzzle";

export default interface PuzzleKeeper {
	getPuzzle(): Puzzle;
}
