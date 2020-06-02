import BoardOn from "../engine/board/board_on";
import BoardCells from "../engine/board/board_cells";
import BoardBirths from "../engine/board/board_births";
import BoardExits from "../engine/board/board_exits";
import Goal from "../engine/goal/goal";

export default interface LevelData {
	getStep(): number;
	getExits(): BoardExits;
	getBirths(): BoardBirths;
	getCells(): BoardCells;
	getGoals(on: BoardOn): Goal[];
}
