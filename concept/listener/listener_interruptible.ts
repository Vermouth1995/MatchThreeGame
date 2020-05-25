import ListenerAdapter from "./listener_adapter";

export default class ListenerInterruptible<B, T extends (...args: any[]) => B> extends ListenerAdapter<B, T> {
	constructor(private needInterrupted: (now: B) => boolean) {
		super();
	}

	trigger(...args: any[]): B {
		let value: B;
		this.listeners.iterateInterruptible((_: number, now: T) => !this.needInterrupted(now(...args)));
		return value;
	}
}
