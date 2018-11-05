import OnceAdapter from "./once_adapter";
export default class OnceFirst extends OnceAdapter {
	private hasCalled: boolean = false;

	getCallback(): () => void {
		let self: OnceFirst = this;
		return OnceAdapter.delay(function() {
			if (!self.hasCalled) {
				self.hasCalled = true;
				self.call();
			}
		});
	}
}
