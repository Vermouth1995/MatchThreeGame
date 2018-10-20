import Item from "./item";
import Cell from "./cell";
import Coordinate from "./coordinate";
import Render from "./render";
import Birth from "./birth";

export default class Board {
	private cells: Cell[][];
	private render: Render;
	private birth: Birth;
	private birthPlace: Coordinate[];

	constructor() {}

	public setCells(cells : Cell[][]){
		this.cells = cells;
	}

	public setRender(render:Render){
		this.render = render;
	}

	public setBirth(birth:Birth){
		this.birth = birth;
	}

	public setBirthPlace(place:Coordinate[]){
		this.birthPlace = place;
	}

	public getItemByItemOffset(item: Item, offset: Coordinate): Item {
		return this.getItemByLocationOffset(this.getItemLocation(item), offset);
	}

	public getItemByLocationOffset(location: Coordinate, offset: Coordinate): Item {
		return this.getItemByLocation(location.offset(offset));
	}

	public getItemLocation(item: Item): Coordinate {
		// TODO
		return null;
	}

	public getItemByLocation(location: Coordinate): Item {
		// TODO
		return null;
	}

	public fall(onEnd?:(isChanged:boolean)=>void){

	}

	public static readonly CHECK_NUMBER_SELF : number = 1
	public static readonly CHECK_NUMBER_OK_MINIZE : number = 3
	public static readonly CHECK_DIRECTION_UP : Coordinate = new Coordinate(0,-1)
	public static readonly CHECK_DIRECTION_DOWN : Coordinate = new Coordinate(0,1)
	public static readonly CHECK_DIRECTION_LEFT : Coordinate = new Coordinate(-1,0)
	public static readonly CHECK_DIRECTION_RIGHT : Coordinate = new Coordinate(1,0)

	public check() : Coordinate[]{
		let maxPolymerize : Coordinate[] = [];
		
		for (let i = 0; i < this.cells.length; i++) {
			let rowCells : Cell[] = this.cells[i]; 
			for (let j = 0; j < rowCells.length; j++) {
				let cell : Cell = rowCells[j];
				let location : Coordinate = new Coordinate(i,j);
				let nowPolymerize : Coordinate[] = this.checkPosition(location);
				if (maxPolymerize.length < nowPolymerize.length) {
					maxPolymerize = nowPolymerize;
				} 
			}
		}
		return maxPolymerize;
	}

	private checkPosition(location: Coordinate):Coordinate[]{
		let total : Coordinate[] = [];
		let direction : number = 0;
		if (!this.getItemByLocation(location).canPolymerize()) {
			return total;
		}
		let vertical   : Coordinate[] = this.checkPositionDirection(location, Board.CHECK_DIRECTION_UP)
											.concat(this.checkPositionDirection(location, Board.CHECK_DIRECTION_DOWN));
		let horizontal : Coordinate[] = this.checkPositionDirection(location, Board.CHECK_DIRECTION_LEFT) 
											.concat(this.checkPositionDirection(location, Board.CHECK_DIRECTION_RIGHT));
		if ( vertical.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			total.concat(vertical);
			direction++;
		}
		if ( horizontal.length + Board.CHECK_NUMBER_SELF >= Board.CHECK_NUMBER_OK_MINIZE) {
			total.concat(horizontal);
			direction++;
		}
		if (direction != 0) {
			total.push(location);
		}
		return total;
	}

	private checkPositionDirection(location: Coordinate, direction: Coordinate):Coordinate[]{
		let total : Coordinate[] = [];
		let item : Item = this.getItemByLocation(location);
		while(true){
			let offset : Coordinate = location.offset(direction);
			if(!item.equals(this.getItemByLocation(offset))){
				break;
			}
			total.push(offset);
			location = offset;
		}
		return total;
	}

	public explodeBy(item: Item, size: number) {
		return this.explodeAt(this.getItemLocation(item), size);
	}

	public explodeAt(location: Coordinate, size: number) {
		// TODO
	}
	
	
}
