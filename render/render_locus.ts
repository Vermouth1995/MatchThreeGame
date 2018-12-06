import Locus from "../concept/locus";
import Coordinate from "../concept/coordinate";
import RenderPosition from "./render_position";

export default class RenderLocus<T> {
	data: T;
	locus: Locus<Coordinate>;
	zIndex: number;
	constructor(data: T, locus: Locus<Coordinate>, zIndex: number) {
		this.data = data;
		this.locus = locus;
		this.zIndex = zIndex;
	}

	getPostion(timeStamp: number): RenderPosition<T> {
		return new RenderPosition<T>(this.data, this.locus.getLocation(timeStamp), this.zIndex);
	}
}
