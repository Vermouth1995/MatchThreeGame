type TextAlign = "center" | "end" | "left" | "right" | "start";
type TextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";

export default class Font {
	family: string = Font.DEFAULT_FAMILY;
	size: number = Font.DEFAULT_SIZE;
	align: TextAlign = Font.DEFAULT_ALIGN;
	baseline: TextBaseline = Font.DEFAULT_BASELINE;

	setSize(size: number): Font {
		this.size = size;
		return this;
	}

	setFamily(family: string): Font {
		this.family = family;
		return this;
	}

	setAlign(align: TextAlign): Font {
		this.align = align;
		return this;
	}

	setBaseline(baseline: TextBaseline): Font {
		this.baseline = baseline;
		return this;
	}

	static readonly ALIGN_START: TextAlign = "start";
	static readonly ALIGN_END: TextAlign = "end";
	static readonly ALIGN_LEFT: TextAlign = "left";
	static readonly ALIGN_RIGHT: TextAlign = "right";
	static readonly ALIGN_CENTER: TextAlign = "center";

	static readonly BASELINE_TOP: TextBaseline = "top";
	static readonly BASELINE_HANGING: TextBaseline = "hanging";
	static readonly BASELINE_MIDDLE: TextBaseline = "middle";
	static readonly BASELINE_ALPHABETIC: TextBaseline = "alphabetic";
	static readonly BASELINE_IDEOGRAPHIC: TextBaseline = "ideographic";
	static readonly BASELINE_BOTTOM: TextBaseline = "bottom";

	static readonly DEFAULT_SIZE: number = 1;
	static readonly DEFAULT_FAMILY: string = "sans-serif";
	static readonly DEFAULT_ALIGN: TextAlign = Font.ALIGN_START;
	static readonly DEFAULT_BASELINE: TextBaseline = Font.BASELINE_ALPHABETIC;
}
