import Item from "../item/item";

export default interface Birth {
	getItem(): Item;
	popItem(): Item;
}
