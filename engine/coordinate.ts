export default class Coordinate {
	constructor(public row: number, public col: number) {}
	offset(offset: Coordinate): Coordinate {
		return new Coordinate(this.row + offset.row, this.col + offset.col);
	}
	distance(offset: Coordinate): number {
		return Math.sqrt(this.distanceSquare(offset));
	}

	isFarther(offset: Coordinate, distance: number): boolean {
		return distance * distance < this.distanceSquare(offset);
	}

	private distanceSquare(offset: Coordinate): number {
		return (this.row - offset.row) * (this.row - offset.row) + (this.col - offset.col) * (this.col - offset.col);
	}

	radiation(radix: number): Coordinate[] {
		let radiationArea: Coordinate[] = [];
		for (let i = this.row - radix; i <= this.row + radix; ++i) {
			for (let j = this.col - radix; j <= this.col + radix; ++j) {
				if (i == this.row && j == this.col) {
					continue;
				}
				let radiationPoint: Coordinate = new Coordinate(i, j);
				if (!this.isFarther(radiationPoint, radix)) {
					radiationArea.push(radiationPoint);
				}
			}
		}
		return radiationArea;
	}

	static readonly UP: Coordinate = new Coordinate(0, -1);
	static readonly DOWN: Coordinate = new Coordinate(0, 1);
	static readonly LEFT: Coordinate = new Coordinate(-1, 0);
	static readonly RIGHT: Coordinate = new Coordinate(1, 0);

	equal(point: Coordinate): boolean {
		return point.row == this.row && point.col == this.col;
	}

	isIncluded(range: Coordinate[]): boolean {
		for (let i = 0; i < range.length; ++i) {
			if (this.equal(range[i])) {
				return true;
			}
		}
		return false;
	}
}
