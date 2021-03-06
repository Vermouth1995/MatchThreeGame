import CoordinateValue from "../../concept/coordinate/coordinate_value";
import Coordinate from "../../concept/coordinate/coordinate";

import LevelData from "../../game/level_data";

import BoardOn from "../../engine/board/board_on";
import BoardCells from "../../engine/board/board_cells";
import BoardBirths from "../../engine/board/board_births";
import BoardExits from "../../engine/board/board_exits";
import BoardCheck from "../../engine/board/board_check";
import BoardPrecheck from "../../engine/board/board_precheck";

import Goal from "../../engine/goal/goal";
import GoalItemCleared from "../../engine/goal/goal_item_cleared";

import BirthEliminate from "../../engine/birth/birth_eliminate";

import Cell from "../../engine/cell/cell";
import CellLand from "../../engine/cell/cell_land";
import CellBirth from "../../engine/cell/cell_birth";
import CellEmpty from "../../engine/cell/cell_empty";
import CellExit from "../../engine/cell/cell_exit";

import ItemCreator from "../../engine/item/item_creator";

export default class Level implements LevelData {
	private static readonly Size: Coordinate = new CoordinateValue(7, 7);

	private exits: BoardExits;
	private births: BoardBirths;
	private cells: BoardCells;
	private goalApple: GoalItemCleared;
	private birth: BirthEliminate;

	private static readonly STEPS: number = 23;
	private static readonly GOAL_APPLE_SIZE: number = 16;

	constructor() {}

	getStep(): number {
		return Level.STEPS;
	}
	getExits(): BoardExits {
		this.initExits();
		return this.exits;
	}
	getBirths(): BoardBirths {
		this.initBirths();
		return this.births;
	}
	getCells(): BoardCells {
		this.initCells();
		return this.cells;
	}
	getGoals(on: BoardOn): Goal[] {
		this.initGoals(on);
		return [this.goalApple];
	}

	private initExits() {
		if (this.exits != null) {
			return;
		}
		const exitPlace: CellExit[] = [];
		this.exits = new BoardExits(exitPlace);
	}

	private createBirth() {
		if (this.birth != null) {
			return;
		}
		this.birth = new BirthEliminate([ItemCreator.WATER]);
	}

	private initBirths() {
		if (this.births != null) {
			return;
		}
		this.createBirth();
		const birthPlace: CellBirth[] = [];
		for (let i = 0; i < Level.Size.getCol(); i++) {
			const place: CellBirth = new CellBirth();
			place.setBirth(this.birth, new CoordinateValue(0, i));
			birthPlace.push(place);
		}
		this.births = new BoardBirths(birthPlace);
	}

	private getCellArray(): Cell[][] {
		this.createBirth();
		const cells: Cell[][] = [];
		for (let i = 0; i < Level.Size.getRow(); i++) {
			cells.push([]);
			for (let j = 0; j < Level.Size.getCol(); j++) {
				let cell: Cell;
				if (
					(i == 0 && j == 0) ||
					(i == 0 && j == Level.Size.getCol() - 1) ||
					(i == Level.Size.getRow() - 1 && j == 0) ||
					(i == Level.Size.getRow() - 1 && j == Level.Size.getCol() - 1)
				) {
					cell = CellEmpty.getEmpty();
				} else {
					cell = new CellLand();
					cell.setItem(this.birth.popItem());
				}
				cells[i].push(cell);
			}
		}
		return cells;
	}

	private initCells() {
		if (this.cells != null) {
			return;
		}
		const cells: BoardCells = new BoardCells();
		const check: BoardCheck = new BoardCheck(cells);
		const precheck: BoardPrecheck = new BoardPrecheck(cells);
		do {
			cells.setCells(this.getCellArray());
		} while (check.check() != null || precheck.precheck() == null);
		this.cells = cells;
	}

	private initGoals(on: BoardOn) {
		if (this.goalApple != null) {
			return;
		}
		this.goalApple = new GoalItemCleared(on, ItemCreator.createItem(ItemCreator.APPLE), Level.GOAL_APPLE_SIZE);
	}
}
