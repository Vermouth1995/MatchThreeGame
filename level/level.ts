import Board from "../engine/board";
import Coordinate from "../concept/coordinate";
import Puzzle from "../render/puzzle";
export default interface Level {
	getPuzzle(): Puzzle;
}
