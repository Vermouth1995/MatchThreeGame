import Once from "../concept/once/once";
import OnceLast from "../concept/once/once_last";

import Score from "../engine/score";
import Board from "../engine/board/board";
import ItemCreator from "../engine/item/item_creator";
import CellCreator from "../engine/cell/cell_creator";
import Level from "./level";

import Render from "../render/render";

import LevelData from "./level_data";
import Level1 from "../level/1/level";
import Level2 from "../level/2/level";

export default class LevelCreator {
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		const success: Once = new OnceLast().setCallback(onSuccess);
		ItemCreator.LoadStaticResource(render, success.getCallback(), onError);
		CellCreator.LoadStaticResource(render, success.getCallback(), onError);
		Board.LoadStaticResource(render, success.getCallback(), onError);
		Score.LoadStaticResource(render, success.getCallback(), onError);
		Level.LoadStaticResource(render, success.getCallback(), onError);
	}

	static readonly LevelSize: number = 2;
	static readonly TypeCommon: string = "common";

	static size(): number {
		return LevelCreator.LevelSize;
	}

	static getLevel(type: string, name: string): LevelData {
		let level: LevelData;
		switch (type) {
			case LevelCreator.TypeCommon:
				level = LevelCreator.getCommonLevel(name);
				break;
		}
		return level;
	}

	private static getCommonLevel(index: string): LevelData {
		switch (index) {
			case "1":
				return new Level1();
			case "2":
				return new Level2();
			default:
				return null;
		}
	}
}
