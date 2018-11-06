import Board from "../engine/board";
import Coordinate from "../concept/coordinate";
export default interface Level {
	init(board: Board);
	boardSize(): Coordinate;
}
