import Item from "./item";
import PuzzleKeeper from "./puzzle_keeper";

export default interface ItemOwner extends PuzzleKeeper {
	setItem(item: Item): void;
	explode(size: number, onEnd: () => void): void;
	clearMe(onEnd: (onHide: () => void) => void): void;
}
