import CellAdapter from "./cell_adapter";
import Render from "../../render/render";

export default class CellWater extends CellAdapter {
	constructor() {
		super();
	}

	canRobbed(): boolean {
		return false;
	}

	canExchange(): boolean {
		return false;
	}

	private static readonly backgroundImagePath: string = "/cell_water.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		CellWater.backgroundImageId = render.registeredImage(CellWater.backgroundImagePath, onSuccess, onError);
	}
	getBackgroundImageId(): number {
		return CellWater.backgroundImageId;
	}
}
