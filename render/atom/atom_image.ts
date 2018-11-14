import Coordinate from "../../concept/coordinate";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomImage extends AtomAdapter {
	private imageId: number;
	private imageSize: Coordinate;
	constructor(imageId: number, imageSize: Coordinate, location: Coordinate) {
		super(location);
		this.imageSize = imageSize;
		this.imageId = imageId;
	}

	draw(render: Render, timeStamp: number, baseLocation: Coordinate) {
		render.drawImage(this.imageId, baseLocation.offset(this.getLocation(timeStamp)), this.imageSize);
	}
}
