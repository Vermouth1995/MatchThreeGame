import Cell from "./cell";

export default interface CellOwner {
	onExplode(cell: Cell, size: number, onEnd: () => void): void;
}
