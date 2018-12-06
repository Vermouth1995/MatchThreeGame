import Coordinate from "../../concept/coordinate";
// import Locus from "../../concept/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomString extends AtomAdapter {
	private text: string;
	private color: string;
	private size: string;

	// TODO
	constructor(text: string, color: string, size: string) {
		super();
		this.text = text;
		this.color = color;
		this.size = size;
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawString(this.text, location, this.size, this.color);
	}
}
