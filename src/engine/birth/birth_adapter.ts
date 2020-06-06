import Item from "../item/item";
import Birth from "../birth/birth";

export default abstract class BirthAdapter implements Birth {
	constructor() {}
	abstract getItem(): Item;
	abstract popItem(): Item;
}
