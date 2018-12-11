import Cell from "./cell";

export default interface CellOwner {
	exploded(cell: Cell, size: number, onEnd: () => void): void;
}
