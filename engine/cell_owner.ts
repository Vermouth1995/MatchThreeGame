import Cell from "./cell";

export default interface CellOwner {
	explode(cell: Cell, size: number, onEnd: () => void);
}
