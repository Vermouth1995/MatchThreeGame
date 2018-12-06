import Coordinate from "../../concept/coordinate";
import Locus from "../../concept/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomImage extends AtomAdapter {
	private imageId: Locus<number>;
	private imageSize: Locus<Coordinate>;
	constructor(imageId: Locus<number>, imageSize: Locus<Coordinate>) {
		super();
		this.imageSize = imageSize;
		this.imageId = imageId;
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawImage(this.imageId.getLocation(timeStamp), location, this.imageSize.getLocation(timeStamp));
	}
}
