import LinkedList from "../linked_list/linked_list";
import Listener from "./listener";

export default abstract class ListenerAdapter<B, T extends (...args: any[]) => B> implements Listener<B, T> {
	protected listeners: LinkedList<T> = new LinkedList<T>();

	on(listener: T) {
		if (listener == null) {
			return;
		}
		this.listeners.append(listener);
	}

	cut(listener: T) {
		this.listeners.removeBy((now: T) => now == listener);
	}

	clear() {
		this.listeners.clear();
	}

	abstract trigger(...args: any[]): B;
}
