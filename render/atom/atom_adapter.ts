import Coordinate from "../../concept/coordinate";
import Atom from "../atom";
import Render from "../render";

export default abstract class AtomAdapter implements Atom {
	abstract draw(render: Render, baseLocation: Coordinate, timeStamp: number): void;
}
