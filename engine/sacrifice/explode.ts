import Coordinate from "../../algorithm/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Explode extends SacrificeAdapter {
	constructor(source: Coordinate, size: number) {
		super();
		this.guest = source.radiation(size);
		this.owner = source;
	}
}
