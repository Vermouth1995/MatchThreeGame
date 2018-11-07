import Coordinate from "../coordinate";

export default interface Event {
	getLocationNow(): Coordinate;
	getLocation(timeStamp: number): Coordinate;
	setFrom(from: Coordinate):void;
	onEnd(end: () => void):void;
	start():void;
}
