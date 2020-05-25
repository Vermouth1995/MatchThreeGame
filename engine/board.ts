import Cell from "./cell";
import CellAdapter from "./cell/cell_adapter";
import CellExit from "./cell/cell_exit";
import PuzzleKeeper from "./puzzle_keeper";

import Click from "./sacrifice/click";
import Exchange from "./sacrifice/exchange";

import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";

import BoardBirths from "./board/board_births";
import BoardExits from "./board/board_exits";
import BoardCells from "./board/board_cells";
import BoardPuzzle from "./board/board_puzzle";
import BoardCheck from "./board/board_check";
import BoardExplode from "./board/board_explode";
import BoardScrape from "./board/board_scrape";
import BoardPolymerize from "./board/board_polymerize";
import BoardArrivable from "./board/board_arrivable";
import BoardFall from "./board/board_fall";
import BoardExchange from "./board/board_exchange";
import BoardClick from "./board/board_click";
import BoardOn from "./board/board_on";

import Render from "../render/render";
import Puzzle from "../render/puzzle";

export default class Board implements PuzzleKeeper {
	static readonly PUZZLE_CELL_Z_INDEX: number = 10;

	static readonly PUZZLE_EXIT_Z_INDEX: number = 11;

	constructor() {
		this.puzzle = new BoardPuzzle();
		this.puzzle.onBoardClick((location: Coordinate) => {
			if (!this.active) {
				return;
			}
			this.click.click(new Click(location));
		});
		this.puzzle.onBoardExchange((from: Coordinate, to: Coordinate) => {
			if (!this.active) {
				return;
			}
			this.exchange.exchange(new Exchange(from, to));
		});
	}

	private active: boolean = false;
	private births: BoardBirths;
	private exits: BoardExits;
	private cells: BoardCells;
	private check: BoardCheck;
	private explode: BoardExplode;
	private scrape: BoardScrape;
	private polymerize: BoardPolymerize;
	private arrivable: BoardArrivable;
	private fall: BoardFall;
	private exchange: BoardExchange;
	private click: BoardClick;
	private puzzle: BoardPuzzle;
	private on: BoardOn;

	setCells(cells: BoardCells, births: BoardBirths, exits: BoardExits) {
		this.births = births;
		this.exits = exits;
		this.cells = cells;
		this.explode = new BoardExplode(this.cells);
		this.scrape = new BoardScrape(this.cells);
		this.arrivable = new BoardArrivable(this.cells, this.births);
		this.fall = new BoardFall(this.cells, this.births, this.exits, this.arrivable);
		this.check = new BoardCheck(this.cells);
		this.polymerize = new BoardPolymerize(this.cells, this.scrape, this.fall, this.check);
		this.exchange = new BoardExchange(this.cells, this.fall, this.polymerize, this.check);
		this.click = new BoardClick(this.cells, this.fall);
		this.on = new BoardOn(this.cells, this.exits, this.click, this.exchange, this.fall);
		this.cells.iterate((location: Coordinate, cell: Cell) => {
			this.getPuzzle().addChild(cell.getPuzzle(), new Locus(location), Board.PUZZLE_CELL_Z_INDEX);
			return true;
		});
		this.exits.iterate((exit: CellExit) => {
			this.getPuzzle().addChild(exit.getPuzzle(), new Locus(exit.getLocation()), Board.PUZZLE_EXIT_Z_INDEX);
		});
		this.puzzle.setSize(this.cells.size().swell(CellAdapter.RENDER_SIZE));
	}

	getOn() {
		return this.on;
	}

	start() {
		this.active = true;
		this.fall.start();
	}

	close() {
		this.active = false;
	}

	size(): Coordinate {
		if (this.cells == null) {
			return Coordinate.ORIGIN;
		}
		return this.cells.size();
	}

	getPuzzle(): Puzzle {
		return this.puzzle;
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		onSuccess();
	}
}
