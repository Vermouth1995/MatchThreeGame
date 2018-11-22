export default class Coordinate {
	row: number;
	col: number;

	constructor(row: number, col: number) {
		this.row = row;
		this.col = col;
	}
	offset(seed: Coordinate): Coordinate {
		return new Coordinate(this.row + seed.row, this.col + seed.col);
	}

	offsets(seeds: Coordinate[]): Coordinate[] {
		let leaves: Coordinate[] = [];
		for (let i = 0; i < seeds.length; i++) {
			leaves.push(this.offset(seeds[i]));
		}
		return leaves;
	}

	offsetTo(to: Coordinate, degree: number): Coordinate {
		return new Coordinate(this.row + (to.row - this.row) * degree, this.col + (to.col - this.col) * degree);
	}

	floor(): Coordinate {
		return new Coordinate(Math.floor(this.row), Math.floor(this.col));
	}

	negative(): Coordinate {
		return new Coordinate(0 - this.row, 0 - this.col);
	}

	split(size: Coordinate): Coordinate {
		return new Coordinate(this.row / (size.row == 0 ? 1 : size.row), this.col / (size.col == 0 ? 1 : size.col));
	}

	swell(size: Coordinate): Coordinate {
		return new Coordinate(this.row * size.row, this.col * size.col);
	}

	distance(offset: Coordinate): number {
		return Math.sqrt(this.distanceSquare(offset));
	}

	isIn(from: Coordinate, to: Coordinate): boolean {
		return (
			((from.row > this.row && this.row > to.row) || (to.row > this.row && this.row > from.row)) &&
			((from.col > this.col && this.col > to.col) || (to.col > this.col && this.col > from.col))
		);
	}

	isFarther(offset: Coordinate, distance: number): boolean {
		return distance * distance < this.distanceSquare(offset);
	}

	static readonly NEIGHBOR: number = 1;
	isNeighbor(to: Coordinate): boolean {
		if (this.row == to.row) {
			return this.col - to.col == Coordinate.NEIGHBOR || to.col - this.col == Coordinate.NEIGHBOR;
		}
		if (this.col == to.col) {
			return this.row - to.row == Coordinate.NEIGHBOR || to.row - this.row == Coordinate.NEIGHBOR;
		}
		return false;
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

	cross(): Coordinate[] {
		return this.offsets(Coordinate.crossSeed());
	}

	umbrella(): Coordinate[] {
		return this.offsets(Coordinate.umbrellaSeed());
	}

	static crossSeed(): Coordinate[] {
		return [Coordinate.UP, Coordinate.LEFT, Coordinate.DOWN, Coordinate.RIGHT];
	}
	static umbrellaSeed(): Coordinate[] {
		return [Coordinate.UP, Coordinate.LEFTUP, Coordinate.RIGHTUP];
	}

	static readonly UNIT: Coordinate = new Coordinate(1, 1);
	static readonly HALF: Coordinate = new Coordinate(0.5, 0.5);

	static readonly ORIGIN: Coordinate = new Coordinate(0, 0);
	static readonly UP: Coordinate = new Coordinate(-1, 0);
	static readonly DOWN: Coordinate = new Coordinate(1, 0);
	static readonly LEFT: Coordinate = new Coordinate(0, -1);
	static readonly RIGHT: Coordinate = new Coordinate(0, 1);
	static readonly RIGHTUP: Coordinate = new Coordinate(-1, 1);
	static readonly RIGHTDOWN: Coordinate = new Coordinate(1, 1);
	static readonly LEFTUP: Coordinate = new Coordinate(-1, -1);
	static readonly LEFTDOWN: Coordinate = new Coordinate(1, -1);

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
