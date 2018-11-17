import LevelAdapter from "../level_adapter";
import Cell from "../../engine/cell";
import CellLand from "../../engine/cell/cell_land";
import CellEmpty from "../../engine/cell/cell_land";
import CellBirth from "../../engine/cell/cell_birth";
import BirthEliminate from "../../engine/birth/birth_eliminate";

import Coordinate from "../../concept/coordinate";

export default class Level extends LevelAdapter {
	private static readonly Size: Coordinate = new Coordinate(9, 12);

	private birth: BirthEliminate;

	private cells: Cell[][];

	constructor() {
		super();
	}

	boardSize(): Coordinate {
		return Level.Size;
	}

	init() {
		this.initBirth();
		this.initCell();
	}

	private initBirth() {
		this.birth = new BirthEliminate();

		let birthPlace: CellBirth[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			let place: CellBirth = new CellBirth();
			place.setBirth(this.birth, new Coordinate(0, i));
			birthPlace.push(place);
		}
		this.board.setBirthPlace(birthPlace);
	}

	private initCell() {
		this.cells = [];
		for (let i = 0; i < Level.Size.row; i++) {
			this.cells.push([]);
			for (let j = 0; j < Level.Size.row; j++) {

				let cell: Cell
                if(j == 3 || i == 3){
                    cell = new CellEmpty();
                }else{
                    cell = new CellLand();
                    cell.setItem(this.birth.getItemWithoutLoction());
                }
				cell.setOwner(this.board);
				this.cells[i].push(cell);
			}
		}
		this.board.setCells(this.cells);
	}
}
