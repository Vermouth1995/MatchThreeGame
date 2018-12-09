import Cell from "./cell";
import CellAdapter from "./cell/cell_adapter";
import CellOwner from "./cell_owner";
import PuzzleKeeper from "./puzzle_keeper";

import Click from "./sacrifice/click";
import Exchange from "./sacrifice/exchange";

import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";

import BoardBirths from "./board/board_births";
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

export default class Board implements CellOwner, PuzzleKeeper {
	static readonly PUZZLE_CELL_Z_INDEX: number = 10;

	constructor() {
		let self: Board = this;
		this.puzzle = new BoardPuzzle();
		this.puzzle.onBoardClick(function(location: Coordinate) {
			self.click.click(new Click(location));
		});
		this.puzzle.onBoardExchange(function(from: Coordinate, to: Coordinate) {
			self.exchange.exchange(new Exchange(from, to));
		});
	}

	private births: BoardBirths;

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

	setCells(cells: BoardCells, births: BoardBirths) {
		let self: Board = this;
		this.births = births;
		this.cells = cells;
		this.check = new BoardCheck(this.cells);
		this.explode = new BoardExplode(this.cells);
		this.scrape = new BoardScrape(this.cells);
		this.polymerize = new BoardPolymerize(this.cells, this.scrape);
		this.arrivable = new BoardArrivable(this.cells, births);
		this.fall = new BoardFall(this.cells, this.births, this.polymerize, this.check, this.arrivable);
		this.exchange = new BoardExchange(this.cells, this.fall, this.polymerize, this.check);
		this.click = new BoardClick(this.cells, this.fall);
		this.on = new BoardOn(this.cells, this.click, this.exchange, this.fall);
		this.cells.iterate(function(location: Coordinate, cell: Cell): boolean {
			self.getPuzzle().addChild(cell.getPuzzle(), new Locus(location), Board.PUZZLE_CELL_Z_INDEX);
			return true;
		});
		this.puzzle.setSize(this.cells.size().swell(CellAdapter.RENDER_SIZE));
	}

	getOn() {
		return this.on;
	}

	onExplode(cell: Cell, size: number, onEnd: () => void): void {
		this.explode.explode(cell, size, onEnd);
	}

	start() {
		this.fall.start();
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
