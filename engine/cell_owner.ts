import Cell from "./cell";
import PuzzleKeeper from "./puzzle_keeper";

export default interface CellOwner extends PuzzleKeeper {
	explode(cell: Cell, size: number, onEnd: () => void): void;
}
