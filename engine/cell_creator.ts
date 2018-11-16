import Render from "../render/render";
import CellLand from "./cell/cell_land";
import CellWater from "./cell/cell_water";
import OnceLast from "../concept/once/once_last";

export default class CellCreator {
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		let success: OnceLast = new OnceLast();
		success.setCallback(onSuccess);
		CellLand.LoadStaticResource(render, success.getCallback(), onError);
		CellWater.LoadStaticResource(render, success.getCallback(), onError);
	}
}
