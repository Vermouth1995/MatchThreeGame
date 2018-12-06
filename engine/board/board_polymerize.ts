import BoardCells from "./board_cells";
import BoardScrape from "./board_scrape";
import Polymerize from "../sacrifice/polymerize";
import OnceLast from "../../concept/once/once_last";
import Coordinate from "../../concept/coordinate";

export default class BoardPolymerize {
	constructor(cells: BoardCells, scrape: BoardScrape) {
		this.cells = cells;
		this.scrape = scrape;
	}

	private cells: BoardCells;
	private scrape: BoardScrape;

	polymerize(area: Polymerize, onEnd: () => void) {
		if (area.getGuests().length == 0) {
			onEnd();
			return;
		}
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let guests: Coordinate[] = area.getGuests();

		for (let i = 0; i < guests.length; ++i) {
			this.cells.getCellByLocation(guests[i]).polymerizedAsGuest(end.getCallback());
		}
		this.cells.getCellByLocation(area.getOwner()).polymerizedAsOwner(guests.length + 1, end.getCallback());
		this.scrape.scrape(area.getScrape(), end.getCallback());
	}
}
