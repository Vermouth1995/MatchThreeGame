import Coordinate from "../concept/coordinate";
import Puzzle from "../render/puzzle";

export default class BoardPuzzle extends Puzzle {
	private isHold: boolean = false;
	private startLocation: Coordinate;
	private isHoldActive: boolean = false;

	private lastClickLocation: Coordinate;
	private lastClickTimeStamp: number = 0;

	static readonly MaxClickTimeout: number = 1000;

	constructor() {
		super();
		let self: BoardPuzzle = this;
		this.onMouseDown(function(location: Coordinate): boolean {
			location = location.floor();
			self.startLocation = location;
			self.isHold = true;
			self.isHoldActive = true;
			return false;
		});
		this.onMouseUp(function(location: Coordinate): boolean {
			location = location.floor();
			let now: number = Date.now();
			if (self.isHold && self.isHoldActive && self.startLocation.equal(location)) {
				if (
					self.lastClickLocation != null &&
					self.lastClickLocation.equal(location) &&
					self.lastClickTimeStamp + BoardPuzzle.MaxClickTimeout > now
				) {
					self.triggerBoardClick(location);
					self.lastClickLocation = null;
					self.lastClickTimeStamp = 0;
				} else {
					self.lastClickLocation = location;
					self.lastClickTimeStamp = now;
				}
			}
			self.isHoldActive = false;
			self.isHold = false;
			self.startLocation = null;
			return false;
		});
		this.onMouseMove(function(location: Coordinate): boolean {
			location = location.floor();
			if (self.isHold && self.isHoldActive && !self.startLocation.equal(location)) {
				self.triggerBoardExchange(self.startLocation, BoardPuzzle.getNeighbor(self.startLocation, location));
				self.isHoldActive = false;
			}
			return false;
		});
	}

	private static getNeighbor(origin: Coordinate, direct: Coordinate): Coordinate {
		if (origin.isNeighbor(direct)) {
			return direct;
		}
		let neighbors: Coordinate[] = [
			origin.offset(Coordinate.LEFT),
			origin.offset(Coordinate.RIGHT),
			origin.offset(Coordinate.UP),
			origin.offset(Coordinate.DOWN)
		];
		let minDistance: number = Number.MAX_VALUE;
		let minNeighbor: Coordinate;
		for (let i = 0; i < neighbors.length; i++) {
			let neighbor: Coordinate = neighbors[i];
			let distance: number = neighbor.distance(direct);
			if (distance < minDistance) {
				minDistance = distance;
				minNeighbor = neighbor;
			}
		}
		return minNeighbor;
	}

	private boardExchangeListener: (from: Coordinate, to: Coordinate) => void;
	triggerBoardExchange(from: Coordinate, to: Coordinate) {
		if (this.boardExchangeListener != null) {
			this.boardExchangeListener(from, to);
		}
	}
	onBoardExchange(listener: (from: Coordinate, to: Coordinate) => void) {
		this.boardExchangeListener = listener;
	}

	private boardClickListener: (location: Coordinate) => void;
	triggerBoardClick(location: Coordinate) {
		if (this.boardClickListener != null) {
			this.boardClickListener(location);
		}
	}
	onBoardClick(listener: (location: Coordinate) => void) {
		this.boardClickListener = listener;
	}
}
