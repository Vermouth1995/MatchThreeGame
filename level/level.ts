import Puzzle from "../render/puzzle";
export default interface Level {
	getPuzzle(): Puzzle;
}
