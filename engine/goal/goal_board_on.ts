import GoalAdapter from "./goal_adapter";
import BoardOn from "../board/board_on";

export default abstract class GoalBoardOn extends GoalAdapter {
	constructor(protected on: BoardOn) {
		super();
	}
}
