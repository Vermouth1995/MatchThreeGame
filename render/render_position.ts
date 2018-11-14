import Coordinate from "../concept/coordinate";
export default class RenderPosition<T> {
	data: T;
	location: Coordinate;
	zIndex: number;
	constructor(data: T, location: Coordinate, zIndex: number) {
		this.data = data;
		this.location = location;
		this.zIndex = zIndex;
	}
}
