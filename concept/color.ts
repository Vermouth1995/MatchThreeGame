export default class Color {
	r: number;
	g: number;
	b: number;
	a: number;
	static readonly HEX_RADIX: number = 16;
	static readonly DEFAULT_ALPHA: number = 1;
	constructor(r: number, g: number, b: number, a: number = Color.DEFAULT_ALPHA) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toRGB(): string {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}

	toRGBA(): string {
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}

	toHex(): string {
		return "#" + Color.toHex(this.r) + Color.toHex(this.g) + Color.toHex(this.b);
	}

	private static toHex(value: number): string {
		let hex: string = value.toString(Color.HEX_RADIX);
		if (value < Color.HEX_RADIX) {
			hex = "0" + hex;
		}
		return hex;
	}
}
