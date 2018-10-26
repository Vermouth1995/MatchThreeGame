import Coordinate from "../algorithm/coordinate";

export default interface EngineRender {
	drawImage(img: HTMLImageElement, loc: Coordinate);
	getWidth(): number;
	getHeight(): number;
	getWidthAndHeight(): Coordinate;
	onExchange(exchange: (from: Coordinate, to: Coordinate) => void);
}
