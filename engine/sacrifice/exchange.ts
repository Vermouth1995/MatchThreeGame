import Coordinate from "../../concept/coordinate";
import SacrificeAdapter from "./sacrifice_adapter";

export default class Exchange extends SacrificeAdapter {
	constructor() {
		super();
	}
	setFromTo(from: Coordinate, to: Coordinate): Exchange {
		this.guest = [];
		this.guest.push(to);
		this.owner = from;
		return this;
	}

	getFrom(): Coordinate {
		return this.owner;
	}

	getTo(): Coordinate {
		return this.guest[0];
	}

	inNeed(): boolean {
		return this.guest.length != 0;
	}
}
