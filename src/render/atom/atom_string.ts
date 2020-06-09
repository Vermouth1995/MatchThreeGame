import Coordinate from "../../concept/coordinate/coordinate";
import Color from "../../concept/style/color";
import Font from "../../concept/style/font";
import Locus from "../../concept/coordinate/locus";
import AtomAdapter from "./atom_adapter";
import Render from "../render";

export interface ToString {
	toString(): string;
}

export default class AtomString extends AtomAdapter {
	constructor(private text: Locus<ToString>, private color: Locus<Color>, private font: Locus<Font>) {
		super();
	}

	draw(render: Render, location: Coordinate, timeStamp: number) {
		render.drawString(
			this.text.getLocation(timeStamp).toString(),
			location,
			this.font.getLocation(timeStamp),
			this.color.getLocation(timeStamp)
		);
	}
}
