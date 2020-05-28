import ItemOwner from "./item_owner";
import PuzzleKeeper from "../puzzle_keeper";

export default interface Item extends PuzzleKeeper {
	isEmpty(): boolean;
	equals(item: Item): boolean;
	canPolymerize(): boolean;

	bePolymerizedAsOwner(size: number, onEnd: () => void): void;
	bePolymerizedAsGuest(onEnd: () => void): void;
	beExploded(onEnd: () => void): void;
	beScraped(onEnd: () => void): void;

	beClicked(onEnd: () => void): boolean;
	beExchanged(onEnd: () => void): boolean;

	cleared(onEnd: () => void): void;
	created(onEnd: () => void): void;

	setOwner(owner: ItemOwner): void;
	getImageId(): number;
}
