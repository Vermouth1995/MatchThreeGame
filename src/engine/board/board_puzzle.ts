import CoordinateValue from "../../concept/coordinate/coordinate_value";
import Coordinate from "../../concept/coordinate/coordinate";
import Puzzle from "../../render/puzzle";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener/listener";

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
					this.onBoardClick.trigger(location);
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
				this.onBoardExchange.trigger(this.startLocation, BoardPuzzle.getNeighbor(this.startLocation, location));
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
			origin.offset(CoordinateValue.LEFT),
			origin.offset(CoordinateValue.RIGHT),
			origin.offset(CoordinateValue.UP),
			origin.offset(CoordinateValue.DOWN),
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

	public readonly onBoardExchange: Listener<
		void,
		(from: Coordinate, to: Coordinate) => void
	> = new ListenerDiffusion();

	public readonly onBoardClick: Listener<void, (location: Coordinate) => void> = new ListenerDiffusion();
}
