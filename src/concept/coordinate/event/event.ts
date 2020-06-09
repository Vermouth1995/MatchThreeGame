export default interface Event<T> {
	getLocation(timeStamp: number): T;
	getEndLocation(timeStamp: number): T;
	setFrom(from: T): void;
	start(startStamp: number): void;
}
