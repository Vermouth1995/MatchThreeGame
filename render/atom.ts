import Coordinate from "../concept/coordinate";
import Render from "./render";

export default interface Atom {
	draw(render: Render, location: Coordinate, timeStamp: number): void;
}
