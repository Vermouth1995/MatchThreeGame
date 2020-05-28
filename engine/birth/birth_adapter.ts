import Item from "../item/item";
import Coordinate from "../../concept/coordinate";
import Birth from "../birth/birth";

export default abstract class BirthAdapter implements Birth {
	constructor() {}
	abstract getItem(location: Coordinate): Item;
	abstract popItem(location: Coordinate): Item;
}
