import ListenerAdapter from "./listener_adapter";

export default class ListenerDiffusion<B extends void, T extends (...args: any[]) => B> extends ListenerAdapter<B, T> {
	trigger(...args: any[]): B {
		this.listeners.iterate(function(index: number, now: T) {
			now(...args);
		});
		return null;
	}
}
