import Level from "./level";
import Board from "../engine/board";
import Coordinate from "../concept/coordinate";
export default abstract class LevelAdapter implements Level {
	abstract init(board: Board):void;
	abstract boardSize(): Coordinate;
}
