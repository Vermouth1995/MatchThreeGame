import Item from "./item";
import ItemAdapter from "./item_adapter";

export default abstract class ItemBoom extends ItemAdapter {
	constructor() {
		super();
	}

	abstract equals(item:Item):boolean
	canPolymerize():boolean{
		return false;
	}

	polymerizedAsOwner(size:number){
	}
	polymerizedAsGuest(){
	}
	abstract getExplodeSize():number
	exploded(){
		this.cleared();
		this.owner.explode(this.getExplodeSize());
	}
	scraped(){
	}
}