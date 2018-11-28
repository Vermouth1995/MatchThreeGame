import LevelAdapter from "../level_adapter";
import Board from "../../engine/board";
import Cell from "../../engine/cell";
import CellLand from "../../engine/cell/cell_land";
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

	private getCell(): Cell[][] {
		let cells: Cell[][] = [];
		for (let i = 0; i < Level.Size.row; i++) {
			cells.push([]);
			for (let j = 0; j < Level.Size.col; j++) {
				let cell: Cell;
				cell = new CellLand();
				cell.setItem(this.birth.getItemWithoutLoction());
				cell.setOwner(this.board);
				cells[i].push(cell);
			}
		}
		return cells;
	}

	private initCell() {
		let cells: Cell[][];
		do {
			cells = this.getCell();
			Board.formatCells(cells, Level.Size);
		} while (Board.check(cells, Level.Size) != null || Board.precheck(cells, Level.Size) == null);
		this.cells = cells;
		this.board.setCells(this.cells);
	}
}
