import BoardOn from "../engine/board/board_on";
import BoardCells from "../engine/board/board_cells";
import BoardBirths from "../engine/board/board_births";
import BoardExits from "../engine/board/board_exits";
import Goal from "../engine/goal";

export default interface LevelDate {
	getBirths(): BoardBirths;
	getExits(): BoardExits;
	getCells(): BoardCells;
	getGoals(on: BoardOn): Goal[];
	getStep(): number;
}
