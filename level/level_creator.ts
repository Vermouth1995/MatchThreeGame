import Level from "./level";
import Level1 from "./1/level";

export default class LevelCreator {
	public static readonly LevelSize: number = 1;

	static size(): number {
		return LevelCreator.LevelSize;
	}

	static getLevel(index: number): Level {
		if (index <= 0 || index > this.size()) {
			return null;
		}
		switch (index) {
			case 1:
				return new Level1();
			default:
				return null;
		}
	}
}
