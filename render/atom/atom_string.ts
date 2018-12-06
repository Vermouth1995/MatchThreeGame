import Coordinate from "../../concept/coordinate";
import Color from "../../concept/color";
import Locus from "../../concept/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomString extends AtomAdapter {
	private text: Locus<string>;
	private color: Locus<Color>;
	private size: Locus<string>;

	constructor(text: Locus<string>, color: Locus<Color>, size: Locus<string>) {
		super();
		this.text = text;
		this.color = color;
		this.size = size;
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawString(
			this.text.getLocation(timeStamp),
			location,
			this.size.getLocation(timeStamp),
			this.color.getLocation(timeStamp)
		);
	}
}
