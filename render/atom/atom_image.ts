import Coordinate from "../../concept/coordinate";
import Locus from "../../concept/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomImage extends AtomAdapter {
	constructor(private imageId: Locus<number>, private imageSize: Locus<Coordinate>) {
		super();
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawImage(this.imageId.getLocation(timeStamp), location, this.imageSize.getLocation(timeStamp));
	}
}
