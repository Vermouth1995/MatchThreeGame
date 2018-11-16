import OnceAdapter from "./once_adapter";
export default class OnceLast extends OnceAdapter {
	private counter: number = 0;

	getCallback(): () => void {
		let self: OnceLast = this;
		this.counter++;
		return OnceAdapter.delay(function() {
			self.counter--;
			if (self.counter == 0) {
				self.call();
			}
		});
	}
}
