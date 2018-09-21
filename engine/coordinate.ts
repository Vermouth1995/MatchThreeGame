export default class Coordinate {
	constructor(public row: number, public col: number) {}
	offset(offset: Coordinate): Coordinate {
		return new Coordinate(this.row + offset.row, this.col + offset.col);
	}
}
