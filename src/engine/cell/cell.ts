import Item from "../item/item";
import ItemOwner from "../item/item_owner";
import CellOwner from "./cell_owner";
import Coordinate from "../../concept/coordinate/coordinate";
import PuzzleKeeper from "../puzzle_keeper";

export default interface Cell extends ItemOwner, PuzzleKeeper {
	isEmpty(): boolean;

	getItem(): Item;
	popItem(): Item;
	setItem(item: Item): void;
	setOwner(owner: CellOwner): void;

	canRobbed(): boolean;
	canExchange(): boolean;

	bePolymerizedAsOwner(size: number, onEnd: () => void): void;
	bePolymerizedAsGuest(onEnd: () => void): void;
	beExploded(onEnd: () => void): void;
	beScraped(onEnd: () => void): void;

	beClicked(onEnd: () => void): boolean;
	beExchanged(onEnd: () => void): boolean;

	rob(victims: Cell[], offsets: Coordinate[], onEnd: () => void): boolean;
	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean;

	getUpdateTime(): number;

	renderSaveBack(where: Coordinate, when: number): void;
}
