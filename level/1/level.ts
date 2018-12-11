import LevelAdapter from "../level_adapter";
import BoardOn from "../../engine/board/board_on";
import BoardCells from "../../engine/board/board_cells";
import BoardBirths from "../../engine/board/board_births";
import BoardCheck from "../../engine/board/board_check";
import BoardPrecheck from "../../engine/board/board_precheck";
import Goal from "../../engine/goal";
import Cell from "../../engine/cell";
import ItemCreator from "../../engine/item_creator";
import GoalItemCleared from "../../engine/goal/goal_item_cleared";
import CellLand from "../../engine/cell/cell_land";
import CellEmpty from "../../engine/cell/cell_empty";
import CellBirth from "../../engine/cell/cell_birth";
import BirthEliminate from "../../engine/birth/birth_eliminate";

import Coordinate from "../../concept/coordinate";

export default class Level extends LevelAdapter {
	private static readonly Size: Coordinate = new Coordinate(9, 12);

	private birth: BirthEliminate;

	private cells: BoardCells;

	private births: BoardBirths;

	constructor() {
		super();
	}

	boardSize(): Coordinate {
		return Level.Size;
	}

	getBirths(): BoardBirths {
		if (this.births == null) {
			this.initBirths();
		}
		return this.births;
	}

	getCells(): BoardCells {
		if (this.births == null) {
			this.initCells();
		}
		return this.cells;
	}

	getGoals(on: BoardOn): Goal[] {
		return [
			new GoalItemCleared(on, ItemCreator.createItem(ItemCreator.BLUEBERRY), 6),
			new GoalItemCleared(on, ItemCreator.createItem(ItemCreator.LEAF), 6)
		];
	}

	getStep(): number {
		return 10;
	}

	private createBirth() {
		this.birth = new BirthEliminate();
	}

	private initBirths() {
		if (this.birth == null) {
			this.createBirth();
		}
		this.birth = new BirthEliminate();
		let birthPlace: CellBirth[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			let place: CellBirth = new CellBirth();
			place.setBirth(this.birth, new Coordinate(0, i));
			birthPlace.push(place);
		}
		this.births = new BoardBirths(birthPlace);
	}

	private initCells() {
		let cells: BoardCells = new BoardCells();
		let check: BoardCheck = new BoardCheck(cells);
		let precheck: BoardPrecheck = new BoardPrecheck(cells);
		do {
			cells.setCells(this.getCellArray());
		} while (check.check() != null || precheck.precheck() == null);
		this.cells = cells;
	}

	private getCellArray(): Cell[][] {
		if (this.birth == null) {
			this.createBirth();
		}
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
				}
				cells[i].push(cell);
			}
		}
		return cells;
	}
}
