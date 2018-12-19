import Locus from "../concept/locus";
import Coordinate from "../concept/coordinate";
import RenderPosition from "./render_position";

export default class RenderLocus<T> {
	constructor(public data: T, public locus: Locus<Coordinate>, public zIndex: number) {}

	getPostion(timeStamp: number): RenderPosition<T> {
		return new RenderPosition<T>(this.data, this.locus.getLocation(timeStamp), this.zIndex);
	}
}
