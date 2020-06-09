import CoordinateAdaptor from "./coordinate_adaptor";
import Coordinate from "./coordinate";

export default class CoordinateValue extends CoordinateAdaptor {
	constructor(private row: number, private col: number) {
		super();
	}

	getRow(): number {
		return this.row;
	}

	getCol(): number {
		return this.col;
	}

	toStatic(): Coordinate {
		return this;
	}

	offset(seed: Coordinate): Coordinate {
		return new CoordinateValue(this.row + seed.getRow(), this.col + seed.getCol());
	}

	offsetTo(to: Coordinate, degree: number): Coordinate {
		return new CoordinateValue(
			this.row + (to.getRow() - this.row) * degree,
			this.col + (to.getCol() - this.col) * degree
		);
	}

	floor(): Coordinate {
		return new CoordinateValue(Math.floor(this.row), Math.floor(this.col));
	}

	negative(): Coordinate {
		return new CoordinateValue(0 - this.row, 0 - this.col);
	}

	split(size: Coordinate): Coordinate {
		return new CoordinateValue(
			this.row / (size.getRow() == 0 ? 1 : size.getRow()),
			this.col / (size.getCol() == 0 ? 1 : size.getCol())
		);
	}

	swell(size: Coordinate): Coordinate {
		return new CoordinateValue(this.row * size.getRow(), this.col * size.getCol());
	}

	radiation(radix: number): Coordinate[] {
		const radiationArea: Coordinate[] = [];
		for (let i = Math.ceil(this.row - radix); i <= Math.floor(this.row + radix); ++i) {
			for (let j = Math.ceil(this.col - radix); j <= Math.floor(this.col + radix); ++j) {
				if (i == this.row && j == this.col) {
					continue;
				}
				const radiationPoint: Coordinate = new CoordinateValue(i, j);
				if (!this.isFarther(radiationPoint, radix)) {
					radiationArea.push(radiationPoint);
				}
			}
		}
		return radiationArea;
	}

	static crossSeed(): Coordinate[] {
		return [CoordinateValue.UP, CoordinateValue.LEFT, CoordinateValue.DOWN, CoordinateValue.RIGHT];
	}
	static umbrellaSeed(): Coordinate[] {
		return [CoordinateValue.UP, CoordinateValue.LEFTUP, CoordinateValue.RIGHTUP];
	}

	static UNIT: Coordinate = new CoordinateValue(1, 1);
	static HALF: Coordinate = new CoordinateValue(0.5, 0.5);
	static ORIGIN: Coordinate = new CoordinateValue(0, 0);
	static UP: Coordinate = new CoordinateValue(-1, 0);
	static DOWN: Coordinate = new CoordinateValue(1, 0);
	static LEFT: Coordinate = new CoordinateValue(0, -1);
	static RIGHT: Coordinate = new CoordinateValue(0, 1);
	static RIGHTUP: Coordinate = new CoordinateValue(-1, 1);
	static RIGHTDOWN: Coordinate = new CoordinateValue(1, 1);
	static LEFTUP: Coordinate = new CoordinateValue(-1, -1);
	static LEFTDOWN: Coordinate = new CoordinateValue(1, -1);
}
