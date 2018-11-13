import Cell from "../cell";
import Item from "../item";
import CellOwner from "../cell_owner";

export default abstract class CellAdapter implements Cell {
	constructor() {}
	protected owner: CellOwner;
	setOwner(owner: CellOwner) {
		this.owner = owner;
	}
	abstract getItem(): Item;
	abstract setItem(item: Item): void;

	abstract canRobbed(): boolean;
	abstract canExchange(): boolean;

	abstract polymerizedAsOwner(size: number, onEnd: () => void): void;
	abstract polymerizedAsGuest(onEnd: () => void): void;
	abstract exploded(onEnd: () => void): void;
	abstract scraped(onEnd: () => void): void;
	abstract clicked(onEnd: () => void): void;

	abstract rob(victims: Cell[], onEnd: () => void): boolean;
	abstract exchange(to: Cell, onEnd: () => void): boolean;
	explode(size: number, onEnd: () => void) {
		this.owner.explode(this, size, onEnd);
	}

	abstract clearMe(onEnd: () => void): void;
}
