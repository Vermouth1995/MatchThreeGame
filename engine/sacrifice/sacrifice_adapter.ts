import Coordinate from "../../algorithm/coordinate";

export default abstract class SacrificeAdapter {
	owner: Coordinate;
	guest: Coordinate[] = [];
}
