import Coordinate from "../concept/coordinate";

export default interface Event {
	getLocation(timeStamp: number): Coordinate;
	getEndLocation(): Coordinate;
	setFrom(from: Coordinate): void;
	start(startStamp: number): void;
}
