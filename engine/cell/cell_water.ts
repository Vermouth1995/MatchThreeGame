import CellAdapter from "./cell_adapter";
import Cell from "../cell";
import Render from "../../render/render";
import Coordinate from "../../concept/coordinate";

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
	exchange(to: Cell, offset: Coordinate, onEnd: () => void): boolean {
		onEnd();
		return false;
	}

	polymerizedAsOwner(size: number, onEnd: () => void) {
		onEnd();
	}
	polymerizedAsGuest(onEnd: () => void) {
		onEnd();
	}
	exploded(onEnd: () => void) {
		onEnd();
	}
	scraped(onEnd: () => void) {
		onEnd();
	}
	clicked(onEnd: () => void) {
		onEnd();
	}

	rob(victims: Cell[], onEnd: () => void): boolean {
		onEnd();
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
