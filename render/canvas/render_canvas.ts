import Coordinate from "../../concept/coordinate";
import RenderAdapter from "../render_adapter";
import Puzzle from "../puzzle";

export default class RenderCanvas extends RenderAdapter {
	constructor(size: Coordinate, pixel: Coordinate, imagePrefix: string) {
		super(size);
		this.pixel = pixel;
		this.imagePrefix = imagePrefix;
		this.unitPixel = pixel.split(size);
		this.canvas = document.createElement("canvas");
		this.canvas.width = pixel.col;
		this.canvas.height = pixel.row;
		this.pen = <CanvasRenderingContext2D>this.canvas.getContext("2d");
		this.initListener();
	}

	private initListener() {
		let self: RenderCanvas = this;
		let root: Puzzle = this.getRootPuzzle();
		self.canvas.onmouseup = function(event: MouseEvent) {
			if (self.listenerOn) {
				root.triggerMouseUp(self.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)));
			}
		};
		self.canvas.onmousedown = function(event: MouseEvent) {
			if (self.listenerOn) {
				root.triggerMouseDown(self.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)));
			}
		};
		self.canvas.onmousemove = function(event: MouseEvent) {
			if (self.listenerOn) {
				root.triggerMouseMove(self.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)));
			}
		};
	}

	private getLocationByPixelLocation(pixelLocation: Coordinate): Coordinate {
		return pixelLocation.split(this.unitPixel);
	}

	private listenerOn: boolean = false;

	private imagePrefix: string;

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

	registeredImage(image: string, onEnd: () => void, onError: (error: Error) => void): number {
		let self: RenderCanvas = this;
		let imageId: number = super.registeredImage(
			image,
			function() {
				let imageElement: HTMLImageElement = document.createElement("img");
				self.HTMLImages[imageId] = imageElement;
				imageElement.onload = function() {
					onEnd();
				};
				imageElement.onerror = function(event: ErrorEvent) {
					onError(event.error);
				};

				imageElement.src = self.imagePrefix + image;
			},
			onError
		);
		return imageId;
	}

	private renderRequestId: number;

	start() {
		super.start();
		let self: RenderCanvas = this;
		let renderCallback: (timeStamp: number) => void = function(timeStamp: number) {
			//This timestamp starts when the page loads, but we want it to start on January 1, 1970.
			self.clear();
			self.draw(Date.now());
			self.renderRequestId = requestAnimationFrame(renderCallback);
		};
		this.renderRequestId = requestAnimationFrame(renderCallback);
		this.listenerOn = true;
	}

	close() {
		this.listenerOn = false;
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
