export default interface Coordinate {
	getRow(): number;

	getCol(): number;

	toStatic(): Coordinate;

	offset(seed: Coordinate): Coordinate;

	offsets(seeds: Coordinate[]): Coordinate[];

	offsetTo(to: Coordinate, degree: number): Coordinate;

	floor(): Coordinate;

	negative(): Coordinate;

	split(size: Coordinate): Coordinate;

	swell(size: Coordinate): Coordinate;

	distance(offset: Coordinate): number;

	isIn(from: Coordinate, to: Coordinate): boolean;

	isFarther(offset: Coordinate, distance: number): boolean;

	isNeighbor(to: Coordinate): boolean;

	radiation(radix: number): Coordinate[];

	// cross(): Coordinate[];
	//
	// umbrella(): Coordinate[];

	equal(point: Coordinate): boolean;

	isIncluded(range: Coordinate[]): boolean;
}
