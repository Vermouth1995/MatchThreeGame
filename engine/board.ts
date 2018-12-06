import Cell from "./cell";
import CellAdapter from "./cell/cell_adapter";
import CellOwner from "./cell_owner";
import CellBirth from "./cell/cell_birth";
import PuzzleKeeper from "./puzzle_keeper";

import Polymerize from "./sacrifice/polymerize";
import Explode from "./sacrifice/explode";
import Scrape from "./sacrifice/scrape";
import Click from "./sacrifice/click";
import Exchange from "./sacrifice/exchange";

import OnceLast from "../concept/once/once_last";
import Coordinate from "../concept/coordinate";
import Locus from "../concept/locus";
import RandomWeight from "../concept/random_weight";

import BoardPuzzle from "./board/board_puzzle";
import BoardCheck from "./board/board_check";
import BoardExplode from "./board/board_explode";
import BoardArrivable from "./board/board_arrivable";
import BoardCells from "./board/board_cells";

import Render from "../render/render";
import Puzzle from "../render/puzzle";

export default class Board implements CellOwner, PuzzleKeeper {
	static readonly PUZZLE_CELL_Z_INDEX: number = 10;

	private cells: BoardCells;

	private check: BoardCheck;

	private arrivable: BoardArrivable;

	private explode: BoardExplode;

	private birthPlace: CellBirth[];

	private puzzle: BoardPuzzle;

	constructor() {
		let self: Board = this;
		this.puzzle = new BoardPuzzle();
		this.puzzle.onBoardClick(function(location: Coordinate) {
			self.click(new Click(location), function() {
				// OnClick
			});
		});
		this.puzzle.onBoardExchange(function(from: Coordinate, to: Coordinate) {
			self.exchange(new Exchange(from, to), function() {
				// OnExchange
			});
		});
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

	setCells(cells: BoardCells) {
		let self: Board = this;
		this.cells = cells;
		this.check = new BoardCheck(cells);
		this.explode = new BoardExplode(cells);
		this.arrivable = new BoardArrivable(cells, this.birthPlace);

		cells.iterate(function(location: Coordinate, cell: Cell): boolean {
			self.getPuzzle().addChild(cell.getPuzzle(), new Locus(location), Board.PUZZLE_CELL_Z_INDEX);
			return true;
		});
		this.puzzle.setSize(this.cells.size().swell(CellAdapter.RENDER_SIZE));
	}

	setBirthPlace(place: CellBirth[]) {
		this.birthPlace = place;
	}

	polymerize(area: Polymerize, onEnd: () => void) {
		if (area.getGuests().length == 0) {
			onEnd();
			return;
		}
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let guests: Coordinate[] = area.getGuests();

		for (let i = 0; i < guests.length; ++i) {
			this.cells.getCellByLocation(guests[i]).polymerizedAsGuest(end.getCallback());
		}
		this.cells.getCellByLocation(area.getOwner()).polymerizedAsOwner(guests.length + 1, end.getCallback());
		this.scrape(area.getScrape(), end.getCallback());
	}

	scrape(area: Scrape, onEnd: () => void) {
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let goals: Coordinate[] = area.getGoals();
		for (let i = 0; i < goals.length; ++i) {
			this.cells.getCellByLocation(goals[i]).scraped(end.getCallback());
		}
	}

	click(area: Click, onEnd: () => void) {
		let self: Board = this;
		let location: Cell = this.cells.getCellByLocation(area.getLocation());
		location.clicked(function() {
			self.startFall(onEnd);
		});
	}

	exchange(area: Exchange, onEnd: () => void) {
		let self: Board = this;
		let exchangeEnd: OnceLast = new OnceLast();
		exchangeEnd.setCallback(function() {
			self.startFall(onEnd);
		});
		if (area == null || !area.isNeighbor()) {
			exchangeEnd.getCallback()();
			return;
		}
		let fromCell: Cell = this.cells.getCellByLocation(area.getFrom());
		let toCell: Cell = this.cells.getCellByLocation(area.getTo());
		let success: boolean = fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), function() {
			if (!success) {
				exchangeEnd.getCallback()();
				return;
			}

			let polymerize: Polymerize = self.check.check();
			if (polymerize != null) {
				self.polymerize(polymerize, exchangeEnd.getCallback());
			}
			let fromBlock: boolean = fromCell.exchanged(exchangeEnd.getCallback());
			let toBlock: boolean = toCell.exchanged(exchangeEnd.getCallback());
			if (polymerize == null && !fromBlock && !toBlock) {
				fromCell.exchange(toCell, area.getTo().offset(area.getFrom().negative()), exchangeEnd.getCallback());
				return;
			}
		});
	}

	startFall(onNextFallEnd?: () => void) {
		let self: Board = this;
		if (onNextFallEnd != null) {
			this.nextFallEnd.push(onNextFallEnd);
		}
		if (this.isFalling) {
			return;
		}
		this.isFalling = true;
		this.fall(function(isChanged: boolean) {
			let onEnd: (() => void)[] = self.nextFallEnd;
			self.nextFallEnd = [];
			for (let i = 0; i < onEnd.length; i++) {
				onEnd[i]();
			}
			self.isFalling = false;
		});
	}

	private nextFallEnd: (() => void)[] = [];

	private isFalling: boolean = false;

	private fall(onEnd?: (isChanged: boolean) => void) {
		let self: Board = this;
		let isActive: boolean = false;
		let robEnd: OnceLast = new OnceLast();
		robEnd.setCallback(function() {
			if (isActive) {
				self.fall(function(isChanged: boolean) {
					isChanged = isActive || isChanged;
					onEnd(isChanged);
				});
				return;
			}
			let area: Polymerize = self.check.check();
			if (area != null) {
				self.polymerize(area, function() {
					self.fall(onEnd);
				});
				return;
			}
			if (onEnd != null) {
				onEnd(isActive);
			}
		});
		this.arrivable.update();
		for (let i = this.size().row - 1; i >= 0; i--) {
			for (let j = 0; j < this.size().col; j++) {
				let location: Coordinate = new Coordinate(i, j);
				let victims: Cell[] = [];
				let victimLocations: Coordinate[] = [];
				this.getVictimsByLocation(location, victims, victimLocations);

				isActive =
					this.cells.getCellByLocation(location).rob(victims, victimLocations, robEnd.getCallback()) ||
					isActive;
			}
		}
	}

	private chooser: RandomWeight<boolean> = new RandomWeight<boolean>().addFactor(false).addFactor(true);

	private getVictimsByLocation(location: Coordinate, victims: Cell[], victimLocations: Coordinate[]) {
		for (let i = 0; i < this.birthPlace.length; i++) {
			let cellBirth: CellBirth = this.birthPlace[i];
			let birthLocation: Coordinate = cellBirth.getLocation();

			if (location.equal(birthLocation)) {
				victims.push(cellBirth);
				victimLocations.push(Coordinate.UP);
				return;
			}
		}
		let seeds: Coordinate[] = [];
		seeds.push(Coordinate.UP);
		if (this.chooser.getFactor()) {
			seeds.push(Coordinate.LEFTUP);
			seeds.push(Coordinate.RIGHTUP);
		} else {
			seeds.push(Coordinate.RIGHTUP);
			seeds.push(Coordinate.LEFTUP);
		}

		let branchs: Coordinate[] = location.offsets(seeds);
		for (let i = 0; i < seeds.length; i++) {
			let branch: Coordinate = branchs[i];
			if (this.arrivable.isArrivable(branch)) {
				victims.push(this.cells.getCellByLocation(branch));
				victimLocations.push(seeds[i]);
				break;
			}
		}
	}

	onExplode(cell: Cell, size: number, onEnd: () => void): void {
		this.explode.explode(cell, size, onEnd);
	}

	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		onSuccess();
	}
}
