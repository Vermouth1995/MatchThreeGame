import Cell from "./cell";
import Item from "../item/item";

export default interface CellOwner {
	exploded(cell: Cell, size: number, onEnd: () => void): void;
	itemCleared(item: Item): void;
}
