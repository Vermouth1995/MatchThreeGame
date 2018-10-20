import Item from "./item";
import Coordinate from "./coordinate";

export default interface Birth {
	getItem(loc: Coordinate): Item;
}
