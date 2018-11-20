import ItemOwner from "./item_owner";
import PuzzleKeeper from "./puzzle_keeper";
import Coordinate from "../concept/coordinate";

export default interface Item extends PuzzleKeeper {
	equals(item: Item): boolean;
	canPolymerize(): boolean;

	moved(offset: Coordinate, timeCost: number): void;

	polymerizedAsOwner(size: number, onEnd: () => void): void;
	polymerizedAsGuest(onEnd: () => void): void;
	exploded(onEnd: () => void): void;
	scraped(onEnd: () => void): void;
	cleared(onEnd: () => void): void;
	clicked(onEnd: () => void): void;
	// exchanged(onEnd: () => void): void;

	setOwner(owner: ItemOwner): void;
}
