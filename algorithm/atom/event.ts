import Coordinate from "../coordinate";

export default interface Event {
	getLocation(): Coordinate;
	setFrom(from: Coordinate);
	onEnd(end: () => void);
	start();
}
