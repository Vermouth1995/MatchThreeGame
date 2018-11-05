import Coordinate from "../../concept/coordinate";

export default abstract class SacrificeAdapter {
	owner: Coordinate;
	guest: Coordinate[] = [];
}
