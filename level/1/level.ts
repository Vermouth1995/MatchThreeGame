import LevelAdapter from "../level_adapter";
import BoardCells from "../../engine/board/board_cells";
import BoardCheck from "../../engine/board/board_check";
import BoardPrecheck from "../../engine/board/board_precheck";
import Cell from "../../engine/cell";
import CellLand from "../../engine/cell/cell_land";
import CellEmpty from "../../engine/cell/cell_empty";
import CellBirth from "../../engine/cell/cell_birth";
import BirthEliminate from "../../engine/birth/birth_eliminate";

import Coordinate from "../../concept/coordinate";

export default class Level extends LevelAdapter {
	private static readonly Size: Coordinate = new Coordinate(9, 12);

	private birth: BirthEliminate;

	private cells: BoardCells;

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
				if (i + j == 5 || j - i == 6) {
					cell = CellEmpty.getEmpty();
				} else {
					cell = new CellLand();
					cell.setItem(this.birth.getItemWithoutLocation());
					cell.setOwner(this.board);
				}
				cells[i].push(cell);
			}
		}
		return cells;
	}

	private initCell() {
		let cells: BoardCells = new BoardCells();
		let check: BoardCheck = new BoardCheck(cells);
		let precheck: BoardPrecheck = new BoardPrecheck(cells);
		do {
			cells.setCells(this.getCell());
		} while (check.check() != null || precheck.precheck() == null);
		this.cells = cells;
		this.board.setCells(this.cells);
	}
}
