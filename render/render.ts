import Coordinate from "../algorithm/coordinate";
import EngineRender from "../engine/engine_render";
import Atom from "../algorithm/atom/atom";

export default interface Render {
	setSize(size: Coordinate);
	getSize(): Coordinate;

	registeredImage(image: Blob, onEnd: () => void): number;

	addAtom(imageId: number, loc: Coordinate): Atom;
	removeAtom(atom: Atom);
	getEngineRender(): EngineRender;
}
