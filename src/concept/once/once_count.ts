import OnceAdapter from "./once_adapter";

export default class OnceCount extends OnceAdapter {
	private counter: number = 0;
	private threshold: number = 0;

	setThreshold(threshold: number) {
		this.threshold = threshold;
	}

	getCallback(): () => void {
		return OnceAdapter.delay(() => {
			this.counter++;
			if (this.counter == this.threshold) {
				this.call();
			}
		});
	}
}
