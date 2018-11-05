import Coordinate from "../../concept/coordinate";
import RenderAdapter from "../render_adapter";
import EngineRender from "../../engine/engine_render";

export default class RenderCanvas extends RenderAdapter {
	constructor(size: Coordinate) {
		super(size);
	}

	protected HTMLImages: HTMLImageElement[] = [];

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

	getEngineRender(): EngineRender {
		//TODO
		return null;
	}
}
