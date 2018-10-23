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

    static readonly NEIGHBOR:number = 1;
    isNeighbor(to:Coordinate):boolean{
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
		return [
			this.offset(Coordinate.UP),
			this.offset(Coordinate.LEFT),
			this.offset(Coordinate.DOWN),
			this.offset(Coordinate.RIGHT)
		];
	}

	umbrella(): Coordinate[] {
		return [this.offset(Coordinate.UP), this.offset(Coordinate.LEFTUP), this.offset(Coordinate.RIGHTUP)];
	}

	static readonly UP: Coordinate = new Coordinate(0, -1);
	static readonly DOWN: Coordinate = new Coordinate(0, 1);
	static readonly LEFT: Coordinate = new Coordinate(-1, 0);
	static readonly RIGHT: Coordinate = new Coordinate(1, 0);
	static readonly RIGHTUP: Coordinate = new Coordinate(1, -1);
	static readonly RIGHTDOWN: Coordinate = new Coordinate(1, 1);
	static readonly LEFTUP: Coordinate = new Coordinate(-1, -1);
	static readonly LEFTDOWN: Coordinate = new Coordinate(-1, 1);

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
