import BoardCells from "./board_cells";
import OnceLast from "../../concept/once/once_last";
import Coordinate from "../../concept/coordinate";
import Scrape from "../sacrifice/scrape";

export default class BoardScrape {
	constructor(cells: BoardCells) {
		this.cells = cells;
	}

	private cells: BoardCells;

	scrape(area: Scrape, onEnd: () => void) {
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let goals: Coordinate[] = area.getGoals();
		for (let i = 0; i < goals.length; ++i) {
			this.cells.getCellByLocation(goals[i]).scraped(end.getCallback());
		}
	}
}
