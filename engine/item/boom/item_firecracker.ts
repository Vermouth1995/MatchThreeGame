import Item from "../item";
import ItemBoom from "./item_boom";
import Render from "../../../render/render";

export default class ItemFireCracker extends ItemBoom {
	constructor() {
		super();
	}
	private static readonly imagePath: string = "/boom_firecracker.png";
	private static imageId: number;
	getImageId(): number {
		return ItemFireCracker.imageId;
	}
	static LoadStaticResource(render: Render, onSuccess: () => void, onError: (error: Error) => void) {
		ItemFireCracker.imageId = render.registeredImage(ItemFireCracker.imagePath, onSuccess, onError);
	}
	equals(item: Item): boolean {
		return item instanceof ItemFireCracker;
	}

	static readonly POLYMERIZE_SIZE: number = 4;
	static readonly EXPLODE_SIZE: number = 1;
	getExplodeSize(): number {
		return ItemFireCracker.EXPLODE_SIZE;
	}
}
