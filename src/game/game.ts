import Render from "../render/render";

import Message from "./message";
import Level from "./level";
import LevelCreator from "./level_creator";

import Coordinate from "../concept/coordinate/coordinate";
import Locus from "../concept/coordinate/locus";
import Once from "../concept/once/once";
import OnceLast from "../concept/once/once_last";

export default class Game {
	static readonly MIN_RENDER_SIZE = new Coordinate(10, 16);
	static readonly PUZZLE_LEVEL_Z_INDEX = 1;
	static readonly PUZZLE_MESSAGE_Z_INDEX = 1000;

	private levelIndex: number = 1;
	private message: Message;
	private level: Level;

	constructor(private render: Render) {
		this.message = new Message(this.render.getSize());
		this.render
			.getRootPuzzle()
			.addChild(this.message.getPuzzle(), new Locus(Coordinate.ORIGIN), Game.PUZZLE_MESSAGE_Z_INDEX);
		this.render.onResize.on(() => {
			this.message.resizePuzzle(this.render.getSize());
			if (this.level != null) {
				this.level.resizePuzzle(this.render.getSize());
			}
		});
	}

	startLevel(type: string, index: string, onEnd: (success: boolean) => void) {
		this.render.clear();
		this.level = new Level(index, this.render.getSize(), LevelCreator.getLevel(type, index));
		this.render
			.getRootPuzzle()
			.addChild(this.level.getPuzzle(), new Locus(Coordinate.ORIGIN), Game.PUZZLE_LEVEL_Z_INDEX);
		this.level.onEnd.on(onEnd);
	}

	closeLevel() {
		if (this.level != null) {
			this.render.getRootPuzzle().removeChild(this.level.getPuzzle());
			this.level = null;
		}
	}

	start(onError: (error: Error) => void) {
		Game.LoadStaticResource(
			this.render,
			() => {
				this.message.init();
				this.render.start();
				const levelEnd = (success: boolean) => {
					this.message.setText(success ? "Congratulations!" : "Sorry!");
					this.message.show(() => {
						setTimeout(() => {
							this.message.hide(() => {
								this.closeLevel();
								if (success && this.levelIndex + 1 <= LevelCreator.size()) {
									this.levelIndex = this.levelIndex + 1;
								} else {
									this.levelIndex = 1;
								}
								this.startLevel(LevelCreator.TypeCommon, String(this.levelIndex), levelEnd);
							});
						}, 2000);
					});
				};
				this.startLevel(LevelCreator.TypeCommon, this.levelIndex.toString(), levelEnd);
			},
			(error: Error) => {
				onError(error);
			}
		);
	}

	close() {
		this.closeLevel();
		this.render.close();
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		const success: Once = new OnceLast().setCallback(onSuccess);
		LevelCreator.LoadStaticResource(render, success.getCallback(), onError);
		Message.LoadStaticResource(render, success.getCallback(), onError);
	}
}
