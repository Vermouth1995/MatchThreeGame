import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Coordinate from "../../concept/coordinate";
import Polymerize from "../sacrifice/polymerize";
import RandomWeight from "../../concept/random_weight";
import BoardPolymerize from "../board/board_polymerize";
import BoardCheck from "../board/board_check";
import BoardBirths from "../board/board_births";
import BoardArrivable from "../board/board_arrivable";
import CellBirth from "../cell/cell_birth";
import Cell from "../cell";

export default class BoardFall {
	constructor(
		cells: BoardCells,
		births: BoardBirths,
		polymerize: BoardPolymerize,
		check: BoardCheck,
		arrivable: BoardArrivable
	) {
		this.cells = cells;
		this.polymerize = polymerize;
		this.check = check;
		this.births = births;
		this.arrivable = arrivable;
	}
	private check: BoardCheck;
	private births: BoardBirths;
	private cells: BoardCells;
	private polymerize: BoardPolymerize;
	private arrivable: BoardArrivable;

	start(onNextFallEnd?: () => void) {
		let self: BoardFall = this;
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
			for (let i = 0; i < self.fallEnd.length; i++) {
				self.fallEnd[i]();
			}
			self.isFalling = false;
		});
	}

	onFallEnd(onEnd: () => void) {
		if (onEnd != null) {
			this.fallEnd.push(onEnd);
		}
	}

	private fallEnd: (() => void)[] = [];

	private nextFallEnd: (() => void)[] = [];

	private isFalling: boolean = false;

	private fall(onEnd?: (isChanged: boolean) => void) {
		let self: BoardFall = this;
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
				self.polymerize.polymerize(area, function() {
					self.fall(onEnd);
				});
				return;
			}
			if (onEnd != null) {
				onEnd(isActive);
			}
		});
		this.arrivable.update();
		for (let i = this.cells.size().row - 1; i >= 0; i--) {
			for (let j = 0; j < this.cells.size().col; j++) {
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
		let birth: CellBirth = this.births.getBirth(location);
		if (birth != null) {
			victims.push(birth);
			victimLocations.push(Coordinate.UP);
			return;
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
}
