import PuzzleKeeper from "./puzzle_keeper";

export default interface Goal extends PuzzleKeeper {
	onSuccess(success: () => void): void;
	isSuccess(): boolean;
}
