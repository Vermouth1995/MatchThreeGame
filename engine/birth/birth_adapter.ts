import Item from "../item";
import Coordinate from "../../concept/coordinate";
import Birth from "../birth";

export default abstract class BirthAdapter implements Birth {
	constructor() {}
	abstract getItem(loc: Coordinate): Item;
}
