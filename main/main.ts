import Render from "../render/render";
import Board from "../engine/board";
import Level from "../level/level";
import LevelCreator from "../level/level_creator";
import Coordinate from "../concept/coordinate";

export default class Main {
	private render: Render;

	public static readonly RENDER_SIZE = new Coordinate(10, 20);
	public static readonly ENGINE_SIZE = new Coordinate(9, 12);

	private levelIndex: number = 1;

	constructor(render: Render) {
		this.render = render;
	}

	startLevel(index: number) {
		this.render.clear();
		let level: Level = LevelCreator.getLevel(index);
		let board = new Board();
		board.setRender(this.render.getEngineRender());
		level.init(board);
	}

	start() {
		this.startLevel(this.levelIndex);
		this.render.start();
	}

	close() {
		this.render.clear();
		this.render.close();
	}
}
