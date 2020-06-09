import Coordinate from "../../concept/coordinate/coordinate";
import CellEmpty from "../cell/cell_empty";
import OnceLast from "../../concept/once/once_last";
import Once from "../../concept/once/once";
import CellOwner from "../cell/cell_owner";
import Cell from "../cell/cell";
import Item from "../item/item";
import ListenerDiffusion from "../../concept/listener/listener_diffusion";
import Listener from "../../concept/listener/listener";

export default class BoardCells implements CellOwner {
	static readonly CHECK_NUMBER_SELF: number = 1;
	static readonly CHECK_NUMBER_OK_MINIZE: number = 3;

	private cells: Cell[][];

	private cellsSize: Coordinate = Coordinate.ORIGIN;

	itemCleared(item: Item): void {
		this.onItemClear.trigger(item);
	}

	readonly onItemClear: Listener<void, (item: Item) => void> = new ListenerDiffusion();

	private explodedListener: ((cell: Cell, size: number, onEnd: () => void) => void)[] = [];

	exploded(cell: Cell, size: number, onEnd: () => void): void {
		const end: Once = new OnceLast().setCallback(onEnd);
		for (let i = 0; i < this.explodedListener.length; i++) {
			this.explodedListener[i](cell, size, end.getCallback());
		}
	}

	onExplode(listener: (cell: Cell, size: number, onEnd: () => void) => void) {
		this.explodedListener.push(listener);
	}

	getCells(): Cell[][] {
		return this.cells;
	}

	setCells(cells: Cell[][]) {
		if (cells == null) {
			cells = [];
		}
		this.cellsSize = BoardCells.formatCells(cells);
		this.cells = cells;
		this.iterate((_: Coordinate, cell: Cell) => {
			cell.setOwner(this);
			return true;
		});
	}

	iterate(onElement: (location: Coordinate, cell: Cell) => boolean) {
		full: for (let i = 0; i < this.cellsSize.row; i++) {
			for (let j = 0; j < this.cellsSize.col; j++) {
				if (!onElement(new Coordinate(i, j), this.cells[i][j])) {
					break full;
				}
			}
		}
	}

	size(): Coordinate {
		return this.cellsSize;
	}

	getCellByLocation(location: Coordinate): Cell {
		if (
			location.row >= this.cellsSize.row ||
			location.row < 0 ||
			location.col >= this.cellsSize.col ||
			location.col < 0
		) {
			return CellEmpty.getEmpty();
		}
		return this.cells[location.row][location.col];
	}

	getLocationOfCell(cell: Cell): Coordinate {
		for (let i = 0; i < this.cells.length; ++i) {
			for (let j = 0; j < this.cells[i].length; ++j) {
				if (this.cells[i][j] == cell) {
					return new Coordinate(i, j);
				}
			}
		}
		return new Coordinate(0, 0);
	}

	static formatCells(cells: Cell[][], size?: Coordinate): Coordinate {
		if (size == null) {
			let rowSize: number = cells.length;
			let colSize: number = 0;
			for (let i = 0; i < rowSize; i++) {
				let row: Cell[] = cells[i];
				if (row != null && row.length > colSize) {
					colSize = row.length;
				}
			}
			size = new Coordinate(rowSize, colSize);
		}
		for (let i = 0; i < size.row; i++) {
			let row: Cell[] = cells[i];
			if (row == null) {
				row = [];
				cells[i] = row;
			}
			for (let j = 0; j < size.col; j++) {
				let col: Cell = row[j];
				if (col == null) {
					row[j] = CellEmpty.getEmpty();
				}
			}
		}

		return size;
	}
}
