import Item from "./item";
import Coordinate from "../concept/coordinate";

export default interface Birth {
	getItem(loc: Coordinate): Item;
	popItem(loc: Coordinate): Item;
}
