import Coordinate from "../../concept/coordinate";
import Color from "../../concept/color";
import Font from "../../concept/font";
import Locus from "../../concept/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export default class AtomString extends AtomAdapter {
	private text: Locus<string>;
	private color: Locus<Color>;
	private font: Locus<Font>;

	constructor(text: Locus<string>, color: Locus<Color>, font: Locus<Font>) {
		super();
		this.text = text;
		this.color = color;
		this.font = font;
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawString(
			this.text.getLocation(timeStamp),
			location,
			this.font.getLocation(timeStamp),
			this.color.getLocation(timeStamp)
		);
	}
}
