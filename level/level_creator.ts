import OnceLast from "../concept/once/once_last";

import Score from "../engine/score";
import Board from "../engine/board";
import ItemCreator from "../engine/item_creator";
import CellCreator from "../engine/cell_creator";

import Render from "../render/render";

import Level from "./level";
import Level1 from "./1/level";

export default class LevelCreator {
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		let success: OnceLast = new OnceLast();
		success.setCallback(onSuccess);
		ItemCreator.LoadStaticResource(render, success.getCallback(), onError);
		CellCreator.LoadStaticResource(render, success.getCallback(), onError);
		Board.LoadStaticResource(render, success.getCallback(), onError);
		Score.LoadStaticResource(render, success.getCallback(), onError);
	}

	public static readonly LevelSize: number = 1;

	static size(): number {
		return LevelCreator.LevelSize;
	}

	static getLevel(index: number): Level {
		switch (index) {
			case 1:
				return new Level1();
			default:
				return null;
		}
	}
}
