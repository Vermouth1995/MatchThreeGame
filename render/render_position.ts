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

	offsetLocation(location: Coordinate): RenderPosition<T> {
		this.location = this.location.offset(location);
		return this;
	}

	offsetZIndex(zIndex: number): RenderPosition<T> {
		this.zIndex = this.zIndex + zIndex;
		return this;
	}
}
