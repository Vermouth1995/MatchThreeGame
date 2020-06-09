import Coordinate from "./coordinate";

export default abstract class CoordinateAdaptor implements Coordinate {
	constructor() {}

	abstract getRow(): number;

	abstract getCol(): number;

	abstract toStatic(): Coordinate;

	abstract offset(seed: Coordinate): Coordinate;

	abstract offsetTo(to: Coordinate, degree: number): Coordinate;

	abstract floor(): Coordinate;

	abstract negative(): Coordinate;

	abstract split(size: Coordinate): Coordinate;

	abstract swell(size: Coordinate): Coordinate;

	abstract radiation(radix: number): Coordinate[];

	offsets(seeds: Coordinate[]): Coordinate[] {
		const leaves: Coordinate[] = [];
		for (let i = 0; i < seeds.length; i++) {
			leaves.push(this.offset(seeds[i]));
		}
		return leaves;
	}

	distance(offset: Coordinate): number {
		return Math.sqrt(this.distanceSquare(offset));
	}

	isIn(from: Coordinate, to: Coordinate): boolean {
		return (
			((from.getRow() > this.getRow() && this.getRow() > to.getRow()) ||
				(to.getRow() > this.getRow() && this.getRow() > from.getRow())) &&
			((from.getCol() > this.getCol() && this.getCol() > to.getCol()) ||
				(to.getCol() > this.getCol() && this.getCol() > from.getCol()))
		);
	}

	isFarther(offset: Coordinate, distance: number): boolean {
		return distance * distance < this.distanceSquare(offset);
	}

	private static readonly NEIGHBOR: number = 1;
	isNeighbor(to: Coordinate): boolean {
		if (this.getRow() == to.getRow()) {
			return (
				this.getCol() - to.getCol() == CoordinateAdaptor.NEIGHBOR ||
				to.getCol() - this.getCol() == CoordinateAdaptor.NEIGHBOR
			);
		}
		if (this.getCol() == to.getCol()) {
			return (
				this.getRow() - to.getRow() == CoordinateAdaptor.NEIGHBOR ||
				to.getRow() - this.getRow() == CoordinateAdaptor.NEIGHBOR
			);
		}
		return false;
	}

	private distanceSquare(offset: Coordinate): number {
		return (
			(this.getRow() - offset.getRow()) * (this.getRow() - offset.getRow()) +
			(this.getCol() - offset.getCol()) * (this.getCol() - offset.getCol())
		);
	}

	equal(point: Coordinate): boolean {
		return point.getRow() == this.getRow() && point.getCol() == this.getCol();
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
