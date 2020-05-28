import Coordinate from "../../concept/coordinate";

import LevelDate from "../../game/level_date";

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
import BirthWeightWithoutLocation from "../../engine/birth/birth_weight_without_location";

import ItemCreator from "../../engine/item/item_creator";

import Cell from "../../engine/cell/cell";
import CellLand from "../../engine/cell/cell_land";
import CellEmpty from "../../engine/cell/cell_empty";
import CellBirth from "../../engine/cell/cell_birth";
import CellExit from "../../engine/cell/cell_exit";

export default class Level implements LevelDate {
	private static readonly Size: Coordinate = new Coordinate(9, 12);

	private birth: Birth;
	private birthBase: BirthWeightWithoutLocation;
	private birthDrinkCount: BirthCount;

	private cells: BoardCells;

	private births: BoardBirths;

	private exits: BoardExits;

	private goalDrink: GoalItemCleared;
	private goalPinecone: GoalItemCleared;

	constructor() {}

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

	getStep(): number {
		return 30;
	}

	getGoals(on: BoardOn): Goal[] {
		this.initGoals(on);
		return [this.goalPinecone, this.goalDrink];
	}

	private static readonly DRINK_SIZE: number = 6;
	private static readonly GOAL_DRINK_SIZE: number = Level.DRINK_SIZE;
	private static readonly GOAL_PINECONE_SIZE: number = 30;

	private static readonly DRINK_ACTIVE_MAX_SIZE: number = 2;

	private static readonly BIRTH_ELIMINATE_WEIGHT: number = 5;
	private static readonly BIRTH_PINECONE_WEIGHT: number = 1;

	private createBirth() {
		if (this.birth != null) {
			return;
		}
		this.birthBase = new BirthWeightWithoutLocation()
			.addBirthWeight(new BirthEliminate(), Level.BIRTH_ELIMINATE_WEIGHT)
			.addBirthWeight(new BirthPinecone(), Level.BIRTH_PINECONE_WEIGHT);
		this.birthDrinkCount = new BirthCount(Level.DRINK_SIZE, new BirthDrink(), this.birthBase);
		this.birth = new BirthCondition(
			() => this.goalDrink.getSteps() - this.birthDrinkCount.getSize() < Level.DRINK_ACTIVE_MAX_SIZE,
			this.birthDrinkCount,
			this.birthBase
		);
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

	private initExits() {
		if (this.exits != null) {
			return;
		}
		let exitPlace: CellExit[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			let place: CellExit = new CellExit();
			place.setLocation(new Coordinate(Level.Size.row - 1, i));
			exitPlace.push(place);
		}

		this.exits = new BoardExits(exitPlace);
	}

	private initBirths() {
		if (this.births != null) {
			return;
		}
		this.createBirth();
		let birthPlace: CellBirth[] = [];
		for (let i = 0; i < Level.Size.col; i++) {
			let place: CellBirth = new CellBirth();
			place.setBirth(this.birth, new Coordinate(0, i));
			birthPlace.push(place);
		}
		this.births = new BoardBirths(birthPlace);
	}

	private initCells() {
		if (this.cells != null) {
			return;
		}
		let cells: BoardCells = new BoardCells();
		let check: BoardCheck = new BoardCheck(cells);
		let precheck: BoardPrecheck = new BoardPrecheck(cells);
		do {
			cells.setCells(this.getCellArray());
		} while (check.check() != null || precheck.precheck() == null);
		this.cells = cells;
	}

	private getCellArray(): Cell[][] {
		this.createBirth();
		let cells: Cell[][] = [];
		for (let i = 0; i < Level.Size.row; i++) {
			cells.push([]);
			for (let j = 0; j < Level.Size.col; j++) {
				let cell: Cell;
				if (i + j == 5 || j - i == 6) {
					cell = CellEmpty.getEmpty();
				} else {
					cell = new CellLand();
					cell.setItem(this.birthBase.getItemWithoutLocation());
				}
				cells[i].push(cell);
			}
		}
		return cells;
	}
}
