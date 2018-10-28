import Coordinate from "../coordinate";
import Event from "./event";

export default class Atom {
	private id: number;
	private location: Coordinate;
	constructor(id: number, location: Coordinate, ) {
		this.id = id;
		this.location = location;
	}

	getId(): number {
		return this.id;
	}

	getLocation(): Coordinate {
		// TODO
		return this.location;
	}

	private event:Event

    setEvent(event:Event){
        this.event = event;
    }
}
