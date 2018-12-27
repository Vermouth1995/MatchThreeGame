import ListenerAdapter from "./listener_adapter";

export default class ListenerInterruptible<B, T extends (...args: any[]) => B> extends ListenerAdapter<B, T> {
	constructor(private needInterrupted: (now: B) => boolean) {
		super();
	}

	trigger(...args: any[]): B {
		let self = this;
		let value: B;
		this.listeners.iterateInterruptible(function(index: number, now: T): boolean {
			value = now(...args);
			return !self.needInterrupted(value);
		});
		return value;
	}
}
