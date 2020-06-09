import Color from "../../concept/style/color";
import Font from "../../concept/style/font";
import CoordinateValue from "../../concept/coordinate/coordinate_value";
import Coordinate from "../../concept/coordinate/coordinate";
import RenderAdapter from "../../render/render_adapter";
import Puzzle from "../../render/puzzle";

export default class RenderCanvas extends RenderAdapter {
	constructor(private container: HTMLElement, private minSize: Coordinate, private imagePrefix: string) {
		super(RenderCanvas.getRenderSize(minSize, new CoordinateValue(container.clientHeight, container.clientWidth)));
		this.pixel = new CoordinateValue(container.clientHeight, container.clientWidth);
		this.unitPixel = this.pixel.split(this.getSize());
		this.canvas = document.createElement("canvas");
		this.canvas.width = container.clientWidth;
		this.canvas.height = container.clientHeight;
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.top = "0px";
		this.canvas.style.left = "0px";
		this.pen = <CanvasRenderingContext2D>this.canvas.getContext("2d");
		this.initListener();
		container.appendChild(this.canvas);
		window.onresize = (event: UIEvent) => {
			this.pixel = new CoordinateValue(container.clientHeight, container.clientWidth);
			this.setSize(RenderCanvas.getRenderSize(minSize, this.pixel));
			this.unitPixel = this.pixel.split(this.getSize());
			this.canvas.width = container.clientWidth;
			this.canvas.height = container.clientHeight;
			this.onResize.trigger();
		};
	}
	private pixel: Coordinate;
	private listenerOn: boolean = false;
	private unitPixel: Coordinate;
	private canvas: HTMLCanvasElement;
	private pen: CanvasRenderingContext2D;
	protected HTMLImages: HTMLImageElement[] = [];
	private renderRequestId: number;

	private initListener() {
		const root: Puzzle = this.getRootPuzzle();
		const triggerMouseDown = (location: Coordinate) => {
			if (this.listenerOn) {
				root.triggerMouseDown(this.getLocationByPixelLocation(location), Date.now());
			}
		};
		const triggerMouseUp = (location: Coordinate) => {
			if (this.listenerOn) {
				root.triggerMouseUp(this.getLocationByPixelLocation(location), Date.now());
			}
		};
		const triggerMouseMove = (location: Coordinate) => {
			if (this.listenerOn) {
				root.triggerMouseMove(this.getLocationByPixelLocation(location), Date.now());
			}
		};
		// 按下手指
		this.canvas.ontouchstart = (event: TouchEvent) => {
			triggerMouseDown(new CoordinateValue(event.changedTouches[0].pageY, event.changedTouches[0].pageX));
		};
		// 松开手指
		this.canvas.ontouchend = (event: TouchEvent) => {
			triggerMouseUp(new CoordinateValue(event.changedTouches[0].pageY, event.changedTouches[0].pageX));
		};
		// 滑动手指
		this.canvas.ontouchmove = (event: TouchEvent) => {
			triggerMouseMove(new CoordinateValue(event.changedTouches[0].pageY, event.changedTouches[0].pageX));
		};
		// 按下鼠标
		this.canvas.onmousedown = (event: MouseEvent) => {
			triggerMouseDown(new CoordinateValue(event.offsetY, event.offsetX));
		};
		// 松开鼠标
		this.canvas.onmouseup = (event: MouseEvent) => {
			triggerMouseUp(new CoordinateValue(event.offsetY, event.offsetX));
		};
		// 移动鼠标
		this.canvas.onmousemove = (event: MouseEvent) => {
			triggerMouseMove(new CoordinateValue(event.offsetY, event.offsetX));
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
		const imageId: number = super.registeredImage(
			image,
			() => {
				const imageElement: HTMLImageElement = document.createElement("img");
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
		const renderCallback: (timeStamp: number) => void = (_: number) => {
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
		this.pen.clearRect(
			CoordinateValue.ORIGIN.getCol(),
			CoordinateValue.ORIGIN.getRow(),
			this.pixel.getCol(),
			this.pixel.getRow()
		);
	}

	drawImage(imageId: number, location: Coordinate, size: Coordinate) {
		if (imageId == RenderAdapter.IMAGE_ID_EMPTY) {
			return;
		}
		const locationPixel: Coordinate = location.swell(this.unitPixel);
		const sizePixel: Coordinate = size.swell(this.unitPixel);

		this.pen.drawImage(
			this.getImage(imageId),
			locationPixel.getCol(),
			locationPixel.getRow(),
			sizePixel.getCol(),
			sizePixel.getRow()
		);
	}

	drawString(text: string, location: Coordinate, font: Font, color: Color): void {
		const locationPixel: Coordinate = location.swell(this.unitPixel);
		this.pen.fillStyle = color.toRGBA();
		this.pen.font = font.size * this.unitPixel.getRow() + "px " + font.family;
		this.pen.textAlign = font.align;
		this.pen.textBaseline = font.baseline;
		this.pen.fillText(text, locationPixel.getCol(), locationPixel.getRow());
	}

	static getRenderSize(minSize: Coordinate, physicalSize: Coordinate): Coordinate {
		const ratio = physicalSize.getCol() / physicalSize.getRow() / (minSize.getCol() / minSize.getRow());
		if (ratio > 1) {
			return new CoordinateValue(
				minSize.getRow(),
				(physicalSize.getCol() / physicalSize.getRow()) * minSize.getRow()
			);
		} else {
			return new CoordinateValue(
				(physicalSize.getRow() / physicalSize.getCol()) * minSize.getCol(),
				minSize.getCol()
			);
		}
	}
}
