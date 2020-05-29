import PuzzleKeeper from "../puzzle_keeper";
import Listener from "../../concept/listener/listener";

export default interface Goal extends PuzzleKeeper {
	readonly onSuccess: Listener<void, () => void>;
	isSuccess(): boolean;
}
