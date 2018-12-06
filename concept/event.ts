export default interface Event<T> {
	getLocation(timeStamp: number): T;
	getEndLocation(): T;
	setFrom(from: T): void;
	start(startStamp: number): void;
}
