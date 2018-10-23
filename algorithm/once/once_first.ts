import OnceAdapter from "./once_adapter";
export default class OnceFrist extends OnceAdapter {
	private hasCalled: boolean = false;

	getCallback(): () => void {
		let self: OnceFrist = this;
		return this.delay(function() {
			if (!self.hasCalled) {
				self.hasCalled = true;
				self.call();
			}
		});
	}
}
