import Item from "../item";
import Cell from "../cell";
import BoardCells from "./board_cells";
import Exchange from "../sacrifice/exchange";
import Coordinate from "../../concept/coordinate";

export default class BoardPrecheck {
	constructor(private cells: BoardCells) {}

	precheck(): Exchange {
		let exchange: Exchange;
		this.cells.iterate((location: Coordinate, _: Cell) => {
			exchange = this.precheckPositon(location);
			if (exchange != null) {
				return false;
			}
			return true;
		});

		return exchange;
	}

	private precheckPositon(location: Coordinate): Exchange {
		let cell: Cell = this.cells.getCellByLocation(location);
		if (!cell.canExchange()) {
			return null;
		}
		let item: Item = cell.getItem();
		if (!item.canPolymerize()) {
			return null;
		}
		let cross: Coordinate[] = location.cross();
		for (let i = 0; i < cross.length; i++) {
			if (this.precheckPositonCross(item, cross[i], location)) {
				return new Exchange(location, cross[i]);
			}
		}
		return null;
	}

	private precheckPositonCross(item: Item, location: Coordinate, ignore: Coordinate): boolean {
		let vertical: Coordinate[] = []
			.concat(this.precheckPositionDirection(item, location, ignore, Coordinate.UP))
			.concat(this.precheckPositionDirection(item, location, ignore, Coordinate.DOWN));
		let horizontal: Coordinate[] = []
			.concat(this.precheckPositionDirection(item, location, ignore, Coordinate.LEFT))
			.concat(this.precheckPositionDirection(item, location, ignore, Coordinate.RIGHT));
		return (
			vertical.length + BoardCells.CHECK_NUMBER_SELF >= BoardCells.CHECK_NUMBER_OK_MINIZE ||
			horizontal.length + BoardCells.CHECK_NUMBER_SELF >= BoardCells.CHECK_NUMBER_OK_MINIZE
		);
	}

	private precheckPositionDirection(
		item: Item,
		location: Coordinate,
		ignore: Coordinate,
		direction: Coordinate
	): Coordinate[] {
		let total: Coordinate[] = [];
		while (true) {
			let directLocation: Coordinate = location.offset(direction);
			if (directLocation.equal(ignore)) {
				break;
			}
			if (!item.equals(this.cells.getCellByLocation(directLocation).getItem())) {
				break;
			}
			total.push(directLocation);
			location = directLocation;
		}
		return total;
	}
}
