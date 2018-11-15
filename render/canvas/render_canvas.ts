import Coordinate from "../../concept/coordinate";
import RenderAdapter from "../render_adapter";

export default class RenderCanvas extends RenderAdapter {
	constructor(size: Coordinate, pixel: Coordinate) {
		super(size);
		this.pixel = pixel;
		this.unitPixel = pixel.split(size);
		this.canvas = document.createElement("canvas");
		this.canvas.width = pixel.col;
		this.canvas.height = pixel.row;
		this.pen = <CanvasRenderingContext2D>this.canvas.getContext("2d");
	}

	private pixel: Coordinate;

	private unitPixel: Coordinate;

	private canvas: HTMLCanvasElement;

	private pen: CanvasRenderingContext2D;

	getCanvasElement(): HTMLCanvasElement {
		return this.canvas;
	}

	protected HTMLImages: HTMLImageElement[] = [];

	private getImage(imageID: number): HTMLImageElement {
		return this.HTMLImages[imageID];
	}

	registeredImage(imageBlob: Blob, onEnd: () => void): number {
		let self: RenderCanvas = this;
		let imageId: number = super.registeredImage(imageBlob, function() {
			let imageElement: HTMLImageElement = new HTMLImageElement();
			self.HTMLImages[imageId] = imageElement;
			let imageReader: FileReader = new FileReader();
			imageReader.onload = function(event: FileReaderProgressEvent) {
				imageElement.src = event.target.result;
				onEnd();
			};
			imageReader.readAsDataURL(imageBlob);
		});
		return imageId;
	}

	private renderRequestId: number;

	start() {
		super.start();
		let self: RenderCanvas = this;
		let renderCallback: (timeStamp: number) => void = function(timeStamp: number) {
			//This timestamp starts when the page loads, but we want it to start on January 1, 1970.
			self.draw(Date.now());
			self.renderRequestId = requestAnimationFrame(renderCallback);
		};
		self.renderRequestId = requestAnimationFrame(renderCallback);
	}

	close() {
		cancelAnimationFrame(this.renderRequestId);
		super.close();
	}

	clear() {
		super.clear();
		this.pen.clearRect(Coordinate.ORIGIN.col, Coordinate.ORIGIN.row, this.pixel.col, this.pixel.row);
	}

	drawImage(imageId: number, location: Coordinate, size: Coordinate) {
		let locationPixel: Coordinate = location.swell(this.unitPixel);
		let sizePixel: Coordinate = size.swell(this.unitPixel);

		this.pen.drawImage(this.getImage(imageId), locationPixel.col, locationPixel.row, sizePixel.col, sizePixel.row);
	}
}
