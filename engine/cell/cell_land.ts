import CellAdapter from "./cell_adapter";
import Render from "../../render/render";

export default class CellLand extends CellAdapter {
	constructor() {
		super();
	}

	canRobbed(): boolean {
		return true;
	}
	canExchange(): boolean {
		return true;
	}

	private static readonly backgroundImagePath: string = "/cell_land.png";
	private static backgroundImageId: number;
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		CellLand.backgroundImageId = render.registeredImage(CellLand.backgroundImagePath, onSuccess, onError);
	}
	getBackgroundImageId(): number {
		return CellLand.backgroundImageId;
	}
}
