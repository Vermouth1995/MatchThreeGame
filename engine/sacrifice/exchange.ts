import Coordinate from "../coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Exchange extends SacrificeAdapter {
	constructor() {
		super();
	}
	setFromTo(from: Coordinate, to: Coordinate) {
		this.guest = [];
		this.guest.push(to);
		this.owner = from;
	}

	inNeed(): boolean {
		return this.guest.length != 0;
	}
}
