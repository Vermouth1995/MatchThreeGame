import Item from "./item";
import Coordinate from "../algorithm/coordinate";

export default interface Birth {
	getItem(loc: Coordinate): Item;
}
