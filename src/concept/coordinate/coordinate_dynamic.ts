import CoordinateAdaptor from "./coordinate_adaptor";
import CoordinateValue from "./coordinate_value";
import Coordinate from "./coordinate";

export default class CoordinateDynamic extends CoordinateAdaptor {
	constructor(private row: () => number, private col: () => number) {
		super();
	}

	getRow(): number {
		return this.row();
	}

	getCol(): number {
		return this.col();
	}

	toStatic(): CoordinateValue {
		return new CoordinateValue(this.row(), this.col());
	}

	offset(seed: Coordinate): CoordinateDynamic {
		return new CoordinateDynamic(
			() => this.row() + seed.getRow(),
			() => this.col() + seed.getCol()
		);
	}

	offsetTo(to: Coordinate, degree: number): CoordinateDynamic {
		return new CoordinateDynamic(
			() => this.row() + (to.getRow() - this.row()) * degree,
			() => this.col() + (to.getCol() - this.col()) * degree
		);
	}

	floor(): CoordinateDynamic {
		return new CoordinateDynamic(
			() => Math.floor(this.row()),
			() => Math.floor(this.col())
		);
	}

	negative(): CoordinateDynamic {
		return new CoordinateDynamic(
			() => 0 - this.row(),
			() => 0 - this.col()
		);
	}

	split(size: Coordinate): CoordinateDynamic {
		return new CoordinateDynamic(
			() => this.row() / (size.getRow() == 0 ? 1 : size.getRow()),
			() => this.col() / (size.getCol() == 0 ? 1 : size.getCol())
		);
	}

	swell(size: Coordinate): CoordinateDynamic {
		return new CoordinateDynamic(
			() => this.row() * size.getRow(),
			() => this.col() * size.getCol()
		);
	}

	radiation(radix: number): Coordinate[] {
		const radiationArea: Coordinate[] = [];
		for (let i = Math.ceil(this.row() - radix); i <= Math.floor(this.row() + radix); ++i) {
			for (let j = Math.ceil(this.col() - radix); j <= Math.floor(this.col() + radix); ++j) {
				if (i == this.row() && j == this.col()) {
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
}
