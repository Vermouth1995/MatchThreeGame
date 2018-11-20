import Coordinate from "../concept/coordinate";
import Render from "./render";
import Event from "./event";

export default interface Atom {
	draw(render: Render, timeStamp: number, location: Coordinate): void;
	getLocation(timeStamp: number): Coordinate;
	setEvent(event: Event): void;
}
