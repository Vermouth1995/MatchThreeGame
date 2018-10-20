import Item from "./item";
import ItemAdapter from "./item_adapter";

export default class ItemEmpty extends ItemAdapter {
	constructor() {
		super();
	}

	equals(item:Item):boolean{
		return false;
	}
	canPolymerize():boolean{
		return false;
	}

	polymerizedAsOwner(size:number){
	}
	polymerizedAsGuest(){
	}
	exploded(){
	}
	scraped(){
	}
}