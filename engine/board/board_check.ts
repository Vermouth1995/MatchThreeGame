import Item from "../item";
import Cell from "../cell";
import BoardCells from "./board_cells";
import Polymerize from "../sacrifice/polymerize";
import Coordinate from "../../concept/coordinate";

export default class BoardCheck {
	constructor(private cells: BoardCells) {}

	check(): Polymerize {
		let max: Polymerize = null;
		let lastCellUpdateTime: number = 0;
		let self: BoardCheck = this;
		this.cells.iterate(function(location: Coordinate, cell: Cell): boolean {
			let now: Polymerize = self.checkPosition(location);
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
		if (
			!this.cells
				.getCellByLocation(location)
				.getItem()
				.canPolymerize()
		) {
			return null;
		}

		let guests: Coordinate[] = [];

		let vertical: Coordinate[] = this.checkPositionDirection(location, Coordinate.UP).concat(
			this.checkPositionDirection(location, Coordinate.DOWN)
		);
		let horizontal: Coordinate[] = this.checkPositionDirection(location, Coordinate.LEFT).concat(
			this.checkPositionDirection(location, Coordinate.RIGHT)
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
		let total: Coordinate[] = [];
		let item: Item = this.cells.getCellByLocation(location).getItem();
		while (true) {
			let directLocation: Coordinate = location.offset(direction);
			if (!item.equals(this.cells.getCellByLocation(directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}
}
