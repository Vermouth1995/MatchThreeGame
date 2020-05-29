import Color from "../../concept/style/color";
import Font from "../../concept/style/font";
import Coordinate from "../../concept/coordinate";
import RenderAdapter from "../../render/render_adapter";
import Puzzle from "../../render/puzzle";

export default class RenderCanvas extends RenderAdapter {
	constructor(size: Coordinate, private pixel: Coordinate, private imagePrefix: string) {
		super(size);
		this.unitPixel = pixel.split(size);
		this.canvas = document.createElement("canvas");
		this.canvas.width = pixel.col;
		this.canvas.height = pixel.row;
		this.pen = <CanvasRenderingContext2D>this.canvas.getContext("2d");
		this.initListener();
	}

	private listenerOn: boolean = false;
	private unitPixel: Coordinate;
	private canvas: HTMLCanvasElement;
	private pen: CanvasRenderingContext2D;
	protected HTMLImages: HTMLImageElement[] = [];
	private renderRequestId: number;

	private initListener() {
		let root: Puzzle = this.getRootPuzzle();
		this.canvas.onmouseup = (event: MouseEvent) => {
			if (this.listenerOn) {
				root.triggerMouseUp(
					this.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)),
					Date.now()
				);
			}
		};
		this.canvas.onmousedown = (event: MouseEvent) => {
			if (this.listenerOn) {
				root.triggerMouseDown(
					this.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)),
					Date.now()
				);
			}
		};
		this.canvas.onmousemove = (event: MouseEvent) => {
			if (this.listenerOn) {
				root.triggerMouseMove(
					this.getLocationByPixelLocation(new Coordinate(event.offsetY, event.offsetX)),
					Date.now()
				);
			}
		};
	}

	private getLocationByPixelLocation(pixelLocation: Coordinate): Coordinate {
		return pixelLocation.split(this.unitPixel);
	}

	getCanvasElement(): HTMLCanvasElement {
		return this.canvas;
	}

	private getImage(imageID: number): HTMLImageElement {
		return this.HTMLImages[imageID];
	}

	registeredImage(image: string, onEnd: () => void, onError: (error: Error) => void): number {
		let imageId: number = super.registeredImage(
			image,
			() => {
				let imageElement: HTMLImageElement = document.createElement("img");
				this.HTMLImages[imageId] = imageElement;
				imageElement.onload = () => onEnd();
				imageElement.onerror = (event: ErrorEvent) => onError(event.error);
				imageElement.src = this.imagePrefix + image;
			},
			onError
		);
		return imageId;
	}

	start() {
		super.start();
		let renderCallback: (timeStamp: number) => void = (_: number) => {
			//This timestamp starts when the page loads, but we want it to start on January 1, 1970.
			this.clear();
			this.draw(Date.now());
			this.renderRequestId = requestAnimationFrame(renderCallback);
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
		if (imageId == RenderAdapter.IMAGE_ID_EMPTY) {
			return;
		}
		let locationPixel: Coordinate = location.swell(this.unitPixel);
		let sizePixel: Coordinate = size.swell(this.unitPixel);

		this.pen.drawImage(this.getImage(imageId), locationPixel.col, locationPixel.row, sizePixel.col, sizePixel.row);
	}

	drawString(text: string, location: Coordinate, font: Font, color: Color): void {
		let locationPixel: Coordinate = location.swell(this.unitPixel);
		this.pen.fillStyle = color.toRGBA();
		this.pen.font = font.size * this.unitPixel.row + "px " + font.family;
		this.pen.textAlign = font.align;
		this.pen.textBaseline = font.baseline;
		this.pen.fillText(text, locationPixel.col, locationPixel.row);
	}
}
