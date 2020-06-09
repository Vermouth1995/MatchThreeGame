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

import Birth from "../../engine/birth/birth";
import BirthEliminate from "../../engine/birth/birth_eliminate";
import BirthPinecone from "../../engine/birth/birth_pinecone";
import BirthCondition from "../../engine/birth/birth_condition";
import BirthCount from "../../engine/birth/birth_count";
import BirthDrink from "../../engine/birth/birth_drink";
import BirthWeight from "../../engine/birth/birth_weight";

import Cell from "../../engine/cell/cell";
import CellLand from "../../engine/cell/cell_land";
import CellEmpty from "../../engine/cell/cell_empty";
import CellBirth from "../../engine/cell/cell_birth";
import CellExit from "../../engine/cell/cell_exit";

import ItemCreator from "../../engine/item/item_creator";

export default class Level implements LevelData {
	private static readonly Size: Coordinate = new Coordinate(9, 12);

	private exits: BoardExits;
	private births: BoardBirths;
	private cells: BoardCells;
	private goalDrink: GoalItemCleared;
	private goalPinecone: GoalItemCleared;
	private birth: Birth;
	private birthBase: BirthWeight;
	private birthDrinkCount: BirthCount;

	private static readonly STEPS: number = 30;
	private static readonly BIRTH_ELIMINATE_WEIGHT: number = 5;
	private static readonly BIRTH_PINECONE_WEIGHT: number = 1;
	private static readonly DRINK_SIZE: number = 4;
	private static readonly DRINK_ACTIVE_MAX_SIZE: number = 2;
	private static readonly GOAL_DRINK_SIZE: number = Level.DRINK_SIZE;
	private static readonly GOAL_PINECONE_SIZE: number = 20;

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
		return [this.goalPinecone, this.goalDrink];
	}

	private initExits() {
		if (this.exits != null) {
			return;
		}
		const exitPlace: CellExit[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			const place: CellExit = new CellExit();
			place.setLocation(new Coordinate(Level.Size.row - 1, i));
			exitPlace.push(place);
		}

		this.exits = new BoardExits(exitPlace);
	}

	private createBirth() {
		if (this.birth != null) {
			return;
		}
		this.birthBase = new BirthWeight()
			.addBirthWeight(new BirthEliminate(), Level.BIRTH_ELIMINATE_WEIGHT)
			.addBirthWeight(new BirthPinecone(), Level.BIRTH_PINECONE_WEIGHT);
		this.birthDrinkCount = new BirthCount(Level.DRINK_SIZE, new BirthDrink(), this.birthBase);
		this.birth = new BirthCondition(
			() => this.goalDrink.getSteps() - this.birthDrinkCount.getSize() < Level.DRINK_ACTIVE_MAX_SIZE,
			this.birthDrinkCount,
			this.birthBase
		);
	}

	private initBirths() {
		if (this.births != null) {
			return;
		}
		this.createBirth();
		const birthPlace: CellBirth[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			const place: CellBirth = new CellBirth();
			place.setBirth(this.birth, new Coordinate(0, i));
			birthPlace.push(place);
		}
		this.births = new BoardBirths(birthPlace);
	}

	private getCellArray(): Cell[][] {
		this.createBirth();
		const cells: Cell[][] = [];
		for (let i = 0; i < Level.Size.row; i++) {
			cells.push([]);
			for (let j = 0; j < Level.Size.col; j++) {
				let cell: Cell;
				if (i + j == 5 || j - i == 6) {
					cell = CellEmpty.getEmpty();
				} else {
					cell = new CellLand();
					cell.setItem(this.birthBase.popItem());
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
		if (this.goalDrink == null) {
			this.goalDrink = new GoalItemCleared(on, ItemCreator.createItem(ItemCreator.DRINK), Level.GOAL_DRINK_SIZE);
		}
		if (this.goalPinecone == null) {
			this.goalPinecone = new GoalItemCleared(
				on,
				ItemCreator.createItem(ItemCreator.PINECONE),
				Level.GOAL_PINECONE_SIZE
			);
		}
	}
}
