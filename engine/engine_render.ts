import Coordinate from "../concept/coordinate";

export default interface EngineRender {
	drawImage(imageId: number, loc: Coordinate):void;
	registeredImage(image: Blob): number;
	getWidth(): number;
	getHeight(): number;
	getWidthAndHeight(): Coordinate;
	onExchange(exchange: (from: Coordinate, to: Coordinate) => void):void;
}
