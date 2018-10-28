import Coordinate from "../algorithm/coordinate";
import LinkedList from "../algorithm/linked_list/linked_list";
import Render from "./render";
import EngineRender from "../engine/engine_render";
import Atom from "../algorithm/atom/atom";

export default abstract class RenderAdapter implements Render {
	protected size: Coordinate;

	constructor(size: Coordinate) {
		this.setSize(size);
	}

	setSize(size: Coordinate) {
		this.size = size;
	}

	getSize(): Coordinate {
		return this.size;
	}

	protected images: Blob[] = [];

	registeredImage(image: Blob, onEnd: () => void): number {
		let imageId: number = this.images.length;
		this.images.push(image);
		onEnd();
		return imageId;
	}

	protected atoms: LinkedList<Atom> = new LinkedList<Atom>();
	addAtom(imageId: number, location: Coordinate): Atom {
		let atom: Atom = new Atom(imageId, location);
		this.atoms.append(atom);
		return atom;
	}
	removeAtom(atom: Atom) {
		this.atoms.remove(atom);
	}
	abstract getEngineRender(): EngineRender;
}
