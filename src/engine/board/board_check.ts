import Item from "../item/item";
import Cell from "../cell/cell";
import BoardCells from "./board_cells";
import Polymerize from "../sacrifice/polymerize";
import Coordinate from "../../concept/coordinate/coordinate";
import CoordinateValue from "../../concept/coordinate/coordinate_value";

export default class BoardCheck {
	constructor(private cells: BoardCells) {}

	check(): Polymerize {
		let max: Polymerize = null;
		let lastCellUpdateTime: number = 0;
		this.cells.iterate((location: Coordinate, cell: Cell) => {
			const now: Polymerize = this.checkPosition(location);
			if (now == null) {
				return true;
			}
			if (
				max == null ||
				max.getGuests().length < now.getGuests().length ||
				(max.getGuests().length == now.getGuests().length && lastCellUpdateTime < cell.getUpdateTime())
			) {
				max = now;
				lastCellUpdateTime = cell.getUpdateTime();
			}
			return true;
		});

		return max;
	}

	private checkPosition(location: Coordinate): Polymerize {
		let direction: number = 0;
		if (!this.cells.getCellByLocation(location).getItem().canPolymerize()) {
			return null;
		}
		let guests: Coordinate[] = [];
		const vertical: Coordinate[] = this.checkPositionDirection(location, CoordinateValue.UP).concat(
			this.checkPositionDirection(location, CoordinateValue.DOWN)
		);
		const horizontal: Coordinate[] = this.checkPositionDirection(location, CoordinateValue.LEFT).concat(
			this.checkPositionDirection(location, CoordinateValue.RIGHT)
		);
		if (vertical.length + BoardCells.CHECK_NUMBER_SELF >= BoardCells.CHECK_NUMBER_OK_MINIZE) {
			guests = guests.concat(vertical);
			direction++;
		}
		if (horizontal.length + BoardCells.CHECK_NUMBER_SELF >= BoardCells.CHECK_NUMBER_OK_MINIZE) {
			guests = guests.concat(horizontal);
			direction++;
		}
		if (direction == 0) {
			return null;
		}

		return new Polymerize(location, guests);
	}

	private checkPositionDirection(location: Coordinate, direction: Coordinate): Coordinate[] {
		const total: Coordinate[] = [];
		const item: Item = this.cells.getCellByLocation(location).getItem();
		while (true) {
			const directLocation: Coordinate = location.offset(direction);
			if (!item.equals(this.cells.getCellByLocation(directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}
}
