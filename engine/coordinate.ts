export default class Coordinate {
	constructor(public row: number, public col: number) {}
	offset(offset: Coordinate): Coordinate {
		return new Coordinate(this.row + offset.row, this.col + offset.col);
	}
	distance(offset: Coordinate): number {
		return Math.sqrt(this.distanceSquare(offset));
	}

	isFarther(offset: Coordinate, distance: number): boolean {
		return Math.pow(distance, 2) < this.distanceSquare(offset);
	}

	private distanceSquare(offset: Coordinate): number {
		return Math.pow(this.row - offset.row, 2) + Math.pow(this.col - offset.col, 2);
	}
}
