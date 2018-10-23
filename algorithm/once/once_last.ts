import OnceAdapter from "./once_adapter";
export default class OnceLast extends OnceAdapter {
	private counter: number = 0;

	getCallback(): () => void {
		let self: OnceLast = this;
		this.counter++;
		return this.delay(function() {
			this.counter--;
			if (self.counter == 0) {
				self.call();
			}
		});
	}
}
