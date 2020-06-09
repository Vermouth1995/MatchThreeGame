import BoardCells from "./board_cells";
import Once from "../../concept/once/once";
import OnceLast from "../../concept/once/once_last";
import Coordinate from "../../concept/coordinate/coordinate";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener/listener";
import RandomWeight from "../../concept/random_weight";
import BoardBirths from "../board/board_births";
import BoardExits from "../board/board_exits";
import BoardArrivable from "../board/board_arrivable";
import CellBirth from "../cell/cell_birth";
import CellExit from "../cell/cell_exit";
import Cell from "../cell/cell";

export default class BoardFall {
	constructor(
		private cells: BoardCells,
		private births: BoardBirths,
		private exits: BoardExits,
		private arrivable: BoardArrivable
	) {}

	start(onNextFallEnd?: () => void) {
		this.onNextFallEnd.on(onNextFallEnd);
		if (this.isFalling) {
			return;
		}
		this.isFalling = true;
		this.fall((_: boolean) => {
			this.onNextFallEnd.trigger();
			this.onNextFallEnd.clear();
			this.onFallEnd.trigger();
			this.isFalling = false;
		});
	}

	readonly onFallEnd: Listener<void, () => void> = new ListenerDiffusion();
	readonly onNextFallEnd: Listener<void, () => void> = new ListenerDiffusion();

	beforeFallEnd(plugin: (onEnd: () => void) => boolean) {
		if (plugin != null) {
			this.plugins.push(plugin);
		}
	}

	private plugins: ((onEnd: () => void) => boolean)[] = [];

	private plugin(onEnd: () => void): boolean {
		const end: Once = new OnceLast().setCallback(onEnd);
		if (this.plugins.length == 0) {
			end.getCallback()();
			return false;
		}
		for (let i = 0; i < this.plugins.length; i++) {
			if (this.plugins[i](end.getCallback())) {
				return true;
			}
		}
		return false;
	}

	private isFalling: boolean = false;

	private fall(onEnd?: (isChanged: boolean) => void) {
		let isActive: boolean = false;
		const robEnd: OnceLast = new OnceLast();
		robEnd.setCallback(() => {
			if (isActive) {
				this.fall((isChanged: boolean) => {
					isChanged = isActive || isChanged;
					onEnd(isChanged);
				});
				return;
			}
			const pluginActive: boolean = this.plugin(() => {
				if (pluginActive) {
					this.fall(onEnd);
					return;
				}
				if (onEnd != null) {
					onEnd(isActive);
				}
			});
		});
		this.arrivable.update();
		this.exits.iterate((exit: CellExit) => {
			const location: Coordinate = exit.getLocation();
			const victims: Cell[] = [];
			const victimLocations: Coordinate[] = [];
			this.getVictimsByExit(location, victims, victimLocations);
			isActive = exit.rob(victims, victimLocations, robEnd.getCallback()) || isActive;
		});
		for (let i = this.cells.size().row - 1; i >= 0; i--) {
			for (let j = 0; j < this.cells.size().col; j++) {
				const location: Coordinate = new Coordinate(i, j);
				const cell: Cell = this.cells.getCellByLocation(location);
				if (cell.isEmpty()) {
					continue;
				}
				const victims: Cell[] = [];
				const victimLocations: Coordinate[] = [];
				this.getVictimsByLocation(location, victims, victimLocations);
				isActive =
					this.cells.getCellByLocation(location).rob(victims, victimLocations, robEnd.getCallback()) ||
					isActive;
			}
		}
	}

	private getVictimsByExit(exitLocation: Coordinate, victims: Cell[], victimLocations: Coordinate[]) {
		const cell: Cell = this.cells.getCellByLocation(exitLocation);
		if (this.arrivable.isArrivable(exitLocation) || (cell.canRobbed() && !cell.getItem().isEmpty())) {
			victims.push(cell);
			victimLocations.push(Coordinate.ORIGIN);
		}
	}

	private chooser: RandomWeight<boolean> = new RandomWeight<boolean>().addFactor(false).addFactor(true);

	private getVictimsByLocation(location: Coordinate, victims: Cell[], victimLocations: Coordinate[]) {
		const birth: CellBirth = this.births.getBirth(location);
		if (birth != null) {
			victims.push(birth);
			victimLocations.push(Coordinate.UP);
			return;
		}

		const seeds: Coordinate[] = [];
		seeds.push(Coordinate.UP);
		if (this.chooser.getFactor()) {
			seeds.push(Coordinate.LEFTUP);
			seeds.push(Coordinate.RIGHTUP);
		} else {
			seeds.push(Coordinate.RIGHTUP);
			seeds.push(Coordinate.LEFTUP);
		}

		const branchs: Coordinate[] = location.offsets(seeds);
		for (let i = 0; i < seeds.length; i++) {
			const branch: Coordinate = branchs[i];
			const cell: Cell = this.cells.getCellByLocation(branch);
			if (this.arrivable.isArrivable(branch) || (cell.canRobbed() && !cell.getItem().isEmpty())) {
				victims.push(cell);
				victimLocations.push(seeds[i]);
				break;
			}
		}
	}
}
