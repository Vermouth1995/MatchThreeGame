import PuzzleKeeper from "./puzzle_keeper";

import Puzzle from "../render/puzzle";
import Render from "../render/render";

export default class Score implements PuzzleKeeper {
	constructor() {}

	private puzzle: Puzzle;

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		onSuccess();
	}
}
