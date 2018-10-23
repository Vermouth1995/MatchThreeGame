import OnceAdapter from "./once_adapter";
export default class OnceCount extends OnceAdapter {
	private counter: number = 0;

	private threshold: number = 0;

	setThreshold(threshold: number) {
		this.threshold = threshold;
	}

	getCallback(): () => void {
		let self: OnceCount = this;
		return this.delay(function() {
			self.counter++;
			if (self.counter == self.threshold) {
				self.call();
			}
		});
	}
}
