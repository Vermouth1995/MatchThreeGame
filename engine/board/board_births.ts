import CellBirth from "../cell/cell_birth";
import Coordinate from "../../concept/coordinate";

export default class BoardBirths {
	constructor(birth: CellBirth[]) {
		this.birth = birth;
	}

	private birth: CellBirth[];

	getBirth(location: Coordinate): CellBirth {
		for (let i = 0; i < this.birth.length; i++) {
			let cellBirth: CellBirth = this.birth[i];
			if (location.equal(cellBirth.getLocation())) {
				return cellBirth;
			}
		}
		return null;
	}

	iterate(onBirth: (birth: CellBirth) => void) {
		for (let i = 0; i < this.birth.length; i++) {
			onBirth(this.birth[i]);
		}
	}
}
