import Coordinate from "./coordinate";

export default interface Render {
	drawImage(img: HTMLImageElement, loc: Coordinate);
	getWidth(): number;
	getHeight(): number;
	getWidthAndHeight(): Coordinate;
}
