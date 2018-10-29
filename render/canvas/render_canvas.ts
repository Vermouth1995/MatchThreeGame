import Coordinate from "../../algorithm/coordinate";
import RenderAdapter from "../render_adapter";
import EngineRender from "../../engine/engine_render";

export default class RenderCanvas extends RenderAdapter {
	constructor(size: Coordinate) {
		super(size);
	}

	protected HTMLImages: HTMLImageElement[] = [];
	registeredImage(image: Blob, onEnd: () => void): number {
		let self = this;
		let imageId: number = super.registeredImage(image, function() {
			let imageElement: HTMLImageElement = new HTMLImageElement();
			self.HTMLImages[imageId] = imageElement;
			let a = new FileReader();
			a.onload = function(e) {
				imageElement.src = e.target.result;
				onEnd();
			};
			a.readAsDataURL(image);
		});
		return imageId;
	}

	getEngineRender(): EngineRender {
		//TODO
		return null;
	}
}
