import Coordinate from "../../concept/coordinate";
import Atom from "../../concept/atom/atom";
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

	draw(timeStamp: number) {
		let self: RenderCanvas = this;
		this.pen.clearRect(0, 0, this.pixel.col, this.pixel.row);
		this.atoms.iterate(function(index: number, atom: Atom) {
			let location: Coordinate = atom.getLocation(timeStamp);
			self.pen.drawImage(
				self.getImage(atom.getId()),
				location.col,
				location.row,
				self.unitPixel.col,
				self.unitPixel.row
			);
		});
	}

	private renderRequestId: number;

	start() {
		super.start();
		let self: RenderCanvas = this;
		let renderCallback: (timeStamp: number) => void = function(timeStamp: number) {
			self.draw(timeStamp);
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
	}
}
