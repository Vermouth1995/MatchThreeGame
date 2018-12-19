import Coordinate from "../concept/coordinate";
export default class RenderPosition<T> {
	constructor(public data: T, public location: Coordinate, public zIndex: number) {}

	offsetLocation(location: Coordinate): RenderPosition<T> {
		this.location = this.location.offset(location);
		return this;
	}

	offsetZIndex(zIndex: number): RenderPosition<T> {
		this.zIndex = this.zIndex + zIndex;
		return this;
	}
}
