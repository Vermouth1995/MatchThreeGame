import Coordinate from "../coordinate";

export default abstract class SacrificeAdapter {
	owner: Coordinate;
	guest: Coordinate[] = [];
}
