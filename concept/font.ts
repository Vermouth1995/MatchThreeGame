export default class Font {
	family: string = Font.DEFAULT_FAMILY;
	size: number = Font.DEFAULT_SIZE;
	align: string = Font.DEFAULT_ALIGN;
	baseline: string = Font.DEFAULT_BASELINE;

	setSize(size: number): Font {
		this.size = size;
		return this;
	}

	setFamily(family: string): Font {
		this.family = family;
		return this;
	}

	setAlign(align: string): Font {
		this.align = align;
		return this;
	}

	setBaseline(baseline: string): Font {
		this.baseline = baseline;
		return this;
	}

	static readonly ALIGN_START: string = "start";
	static readonly ALIGN_END: string = "end";
	static readonly ALIGN_LEFT: string = "left";
	static readonly ALIGN_RIGHT: string = "right";
	static readonly ALIGN_CENTER: string = "center";

	static readonly BASELINE_TOP: string = "top";
	static readonly BASELINE_HANGING: string = "hanging";
	static readonly BASELINE_MIDDLE: string = "middle";
	static readonly BASELINE_ALPHABETIC: string = "alphabetic";
	static readonly BASELINE_IDEOGRAPHIC: string = "ideographic";
	static readonly BASELINE_BOTTOM: string = "bottom";

	static readonly DEFAULT_SIZE: number = 1;
	static readonly DEFAULT_FAMILY: string = "sans-serif";
	static readonly DEFAULT_ALIGN: string = Font.ALIGN_START;
	static readonly DEFAULT_BASELINE: string = Font.BASELINE_ALPHABETIC;
}
