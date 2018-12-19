import BoardCells from "./board_cells";
import BoardScrape from "./board_scrape";
import BoardFall from "./board_fall";
import BoardCheck from "./board_check";
import Polymerize from "../sacrifice/polymerize";
import OnceLast from "../../concept/once/once_last";
import Coordinate from "../../concept/coordinate";

export default class BoardPolymerize {
	constructor(
		private cells: BoardCells,
		private scrape: BoardScrape,
		private fall: BoardFall,
		private check: BoardCheck
	) {
		let self = this;
		this.fall.beforeFallEnd(function(onEnd): boolean {
			let area: Polymerize = self.check.check();
			if (area == null) {
				onEnd();
				return false;
			}
			self.polymerize(area, onEnd);
			return true;
		});
	}

	polymerize(area: Polymerize, onEnd: () => void) {
		if (area.getGuests().length == 0) {
			onEnd();
			return;
		}
		let end: OnceLast = new OnceLast();
		end.setCallback(onEnd);

		let guests: Coordinate[] = area.getGuests();

		for (let i = 0; i < guests.length; ++i) {
			this.cells.getCellByLocation(guests[i]).bePolymerizedAsGuest(end.getCallback());
		}
		this.cells.getCellByLocation(area.getOwner()).bePolymerizedAsOwner(guests.length + 1, end.getCallback());
		this.scrape.scrape(area.getScrape(), end.getCallback());
	}
}
