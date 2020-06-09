import Coordinate from "../../concept/coordinate/coordinate";
import Puzzle from "../../render/puzzle";

export default class BoardPuzzle extends Puzzle {
	private isHold: boolean = false;
	private startLocation: Coordinate;
	private isHoldActive: boolean = false;

	private lastClickLocation: Coordinate;
	private lastClickTimeStamp: number = 0;

	static readonly MaxClickTimeout: number = 1000;

	constructor() {
		super();
		this.onMouseDown((location: Coordinate) => {
			location = location.floor();
			this.startLocation = location;
			this.isHold = true;
			this.isHoldActive = true;
			return false;
		});
		this.onMouseUp((location: Coordinate) => {
			location = location.floor();
			const now: number = Date.now();
			if (this.isHold && this.isHoldActive && this.startLocation.equal(location)) {
				if (
					this.lastClickLocation != null &&
					this.lastClickLocation.equal(location) &&
					this.lastClickTimeStamp + BoardPuzzle.MaxClickTimeout > now
				) {
					this.triggerBoardClick(location);
					this.lastClickLocation = null;
					this.lastClickTimeStamp = 0;
				} else {
					this.lastClickLocation = location;
					this.lastClickTimeStamp = now;
				}
			}
			this.isHoldActive = false;
			this.isHold = false;
			this.startLocation = null;
			return false;
		});
		this.onMouseMove((location: Coordinate) => {
			location = location.floor();
			if (this.isHold && this.isHoldActive && !this.startLocation.equal(location)) {
				this.triggerBoardExchange(this.startLocation, BoardPuzzle.getNeighbor(this.startLocation, location));
				this.isHoldActive = false;
			}
			return false;
		});
	}

	private static getNeighbor(origin: Coordinate, direct: Coordinate): Coordinate {
		if (origin.isNeighbor(direct)) {
			return direct;
		}
		const neighbors: Coordinate[] = [
			origin.offset(Coordinate.LEFT),
			origin.offset(Coordinate.RIGHT),
			origin.offset(Coordinate.UP),
			origin.offset(Coordinate.DOWN),
		];
		let minDistance: number = Number.MAX_VALUE;
		let minNeighbor: Coordinate;
		for (let i = 0; i < neighbors.length; i++) {
			const neighbor: Coordinate = neighbors[i];
			const distance: number = neighbor.distance(direct);
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
