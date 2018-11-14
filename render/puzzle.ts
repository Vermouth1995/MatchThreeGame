import Coordinate from "../concept/coordinate";
import Atom from "./atom";
import LinkedList from "../concept/linked_list/linked_list";
import RenderPosition from "./render_position";

export default class Puzzle {
	triggerClick(location: Coordinate): void {}

	triggerExchange(from: Coordinate, to: Coordinate): void {}

	children(): LinkedList<RenderPosition<Puzzle>> {
		return this.puzzles;
	}

	allAtoms(): LinkedList<RenderPosition<Atom>> {
		return this.atoms;
	}

	protected atoms: LinkedList<RenderPosition<Atom>> = new LinkedList<RenderPosition<Atom>>();
	addAtom(atom: Atom, location: Coordinate, zIndex: number) {
		this.atoms.insertBy(new RenderPosition<Atom>(atom, location, zIndex), function(
			now: RenderPosition<Atom>
		): boolean {
			return zIndex < now.zIndex;
		});
	}
	removeAtom(atom: Atom) {
		this.atoms.removeBy(function(now: RenderPosition<Atom>): boolean {
			return atom == now.data;
		});
	}

	private puzzles: LinkedList<RenderPosition<Puzzle>> = new LinkedList<RenderPosition<Puzzle>>();

	addChild(puzzle: Puzzle, location: Coordinate, zIndex: number) {
		this.puzzles.insertBy(new RenderPosition<Puzzle>(puzzle, location, zIndex), function(
			now: RenderPosition<Puzzle>
		): boolean {
			return zIndex < now.zIndex;
		});
	}

	removeChild(puzzle: Puzzle) {
		this.puzzles.removeBy(function(now: RenderPosition<Puzzle>): boolean {
			return puzzle == now.data;
		});
	}
}
