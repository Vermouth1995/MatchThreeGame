import Coordinate from "../concept/coordinate";
import Render from "./render";

export default interface Atom {
	draw(render: Render, timeStamp: number, location: Coordinate): void;
}
