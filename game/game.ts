import Render from "../render/render";

import Message from "./message";
import Level from "./level";
import LevelCreator from "./level_creator";

import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";
import Once from "../concept/once";
import OnceLast from "../concept/once/once_last";

export default class Game {
	static readonly RENDER_SIZE = new Coordinate(10, 20);

	static readonly PUZZLE_LEVEL_Z_INDEX = 1;
	static readonly PUZZLE_MESSAGE_Z_INDEX = 1000;

	private levelIndex: number = 1;

	private message: Message;

	constructor(private render: Render) {
		this.message = new Message(Game.RENDER_SIZE);
		this.render
			.getRootPuzzle()
			.addChild(this.message.getPuzzle(), new Locus(Coordinate.ORIGIN), Game.PUZZLE_MESSAGE_Z_INDEX);
	}

	private level: Level;

	startLevel(type: string, index: string, onEnd: (success: boolean) => void) {
		this.render.clear();
		this.level = new Level(index, Game.RENDER_SIZE, LevelCreator.getLevel(type, index));
		this.render
			.getRootPuzzle()
			.addChild(this.level.getPuzzle(), new Locus(Coordinate.ORIGIN), Game.PUZZLE_LEVEL_Z_INDEX);
		this.level.onEnd(onEnd);
	}

	closeLevel() {
		if (this.level != null) {
			this.render.getRootPuzzle().removeChild(this.level.getPuzzle());
			this.level = null;
		}
	}

	start(onError: (error: Error) => void) {
		let self: Game = this;
		Game.LoadStaticResource(
			this.render,
			function() {
				self.message.init();
				self.render.start();
				let levelEnd = function(success: boolean) {
					self.message.setText(success ? "Congratulations!" : "Sorry!");
					self.message.show(function() {
						setTimeout(function() {
							self.message.hide(function() {
								self.closeLevel();
								self.startLevel(LevelCreator.TypeCommon, self.levelIndex.toString(), levelEnd);
							});
						}, 5000);
					});
				};
				self.startLevel(LevelCreator.TypeCommon, self.levelIndex.toString(), levelEnd);
			},
			function(error: Error) {
				onError(error);
			}
		);
	}

	close() {
		this.closeLevel();
		this.render.close();
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		let success: Once = new OnceLast().setCallback(onSuccess);
		LevelCreator.LoadStaticResource(render, success.getCallback(), onError);
		Message.LoadStaticResource(render, success.getCallback(), onError);
	}
}
