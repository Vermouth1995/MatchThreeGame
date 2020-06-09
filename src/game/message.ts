import Puzzle from "../render/puzzle";
import Render from "../render/render";
import AtomImage from "../render/atom/atom_image";
import AtomString from "../render/atom/atom_string";

import Font from "../concept/style/font";
import Color from "../concept/style/color";
import CoordinateValue from "../concept/coordinate/coordinate_value";
import Coordinate from "../concept/coordinate/coordinate";
import Locus from "../concept/coordinate/locus";
import EventMove from "../concept/coordinate/event/event_move";
import EventLocationSetter from "../concept/coordinate/event/event_location_setter";
import PuzzleKeeper from "../engine/puzzle_keeper";

export default class Message implements PuzzleKeeper {
	private static readonly BOX_Z_INDEX = 0;
	private static readonly BACKGROUND_IMAGE_Z_INDEX = 1;
	private static readonly TEXT_Z_INDEX = 2;
	private static readonly SHOW_TIME_COST = 200;
	private static readonly ACTIVE_SIZE_COEFFICIENT: Coordinate = new CoordinateValue(0.6, 1);

	private puzzle: Puzzle;
	private boxPuzzle: Puzzle;

	private boxSize: Coordinate;

	private boxLocation: Coordinate;
	private boxActiveLocation: Coordinate;

	private boxLocationLocus: Locus<Coordinate>;

	constructor(private size: Coordinate) {
		this.puzzle = new Puzzle();
		this.puzzle.hide();
		this.boxPuzzle = new Puzzle();
		this.buildSizes();
		this.boxLocationLocus = new Locus<Coordinate>(this.boxLocation);
		this.puzzle.addChild(this.boxPuzzle, this.boxLocationLocus, Message.BOX_Z_INDEX);
	}

	resizePuzzle(size: Coordinate): void {
		this.size = size;
		this.buildSizes();
	}

	private buildSizes() {
		this.boxSize = this.size.swell(Message.ACTIVE_SIZE_COEFFICIENT);
		this.boxLocation = new CoordinateValue(-this.boxSize.getRow(), 0);
		this.boxActiveLocation = new CoordinateValue((this.size.getRow() - this.boxSize.getRow()) / 2, 0);
		this.boxPuzzle.setSize(this.boxSize);
		this.puzzle.setSize(this.size);
	}

	init() {
		this.boxPuzzle.addAtom(
			new AtomImage(new Locus<number>(Message.backgroundImageId), new Locus<Coordinate>(this.boxSize)),
			new Locus<Coordinate>(CoordinateValue.ORIGIN),
			Message.BACKGROUND_IMAGE_Z_INDEX
		);
		this.boxPuzzle.addAtom(
			new AtomString(this.textLocus, new Locus<Color>(this.color), new Locus<Font>(this.font)),
			new Locus<Coordinate>(this.boxSize.swell(CoordinateValue.HALF)),
			Message.TEXT_Z_INDEX
		);
	}

	private color: Color = new Color(255, 255, 255);
	private font: Font = new Font().setSize(0.5).setAlign(Font.ALIGN_CENTER);

	private text: string = "";

	private textLocus: Locus<string> = new Locus<string>(this.text);

	setText(text: string): Message {
		this.text = text;
		this.textLocus.setEvent(new EventLocationSetter<string>(this.text));
		return this;
	}

	show(onEnd: () => void) {
		this.boxLocationLocus.setEvent(new EventLocationSetter<Coordinate>(this.boxLocation));
		this.puzzle.show();
		this.boxLocationLocus.setEvent(
			new EventMove<Coordinate>(
				this.boxActiveLocation,
				Message.SHOW_TIME_COST,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);
		setTimeout(() => {
			onEnd();
		}, Message.SHOW_TIME_COST);
	}

	hide(onEnd: () => void) {
		this.boxLocationLocus.setEvent(
			new EventMove<Coordinate>(
				this.boxLocation,
				Message.SHOW_TIME_COST,
				false,
				(from, to, timeCost, relativeTime) => from.offsetTo(to, relativeTime / timeCost)
			)
		);
		setTimeout(() => {
			this.puzzle.hide();
			onEnd();
		}, Message.SHOW_TIME_COST);
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	private static readonly backgroundImagePath: string = "/message_background.jpg";
	private static backgroundImageId: number;

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		Message.backgroundImageId = render.registeredImage(Message.backgroundImagePath, onSuccess, onError);
	}
}
