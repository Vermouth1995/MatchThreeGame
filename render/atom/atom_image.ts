import Coordinate from "../../concept/coordinate";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomImage extends AtomAdapter {
	private imageId: number;
	private imageSize: Coordinate;
	constructor(imageId: number, imageSize: Coordinate) {
		super();
		this.imageSize = imageSize;
		this.imageId = imageId;
	}

	draw(render: Render, location: Coordinate) {
		render.drawImage(this.imageId, location, this.imageSize);
	}
}
