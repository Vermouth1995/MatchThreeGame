import OnceAdapter from "./once_adapter";

export default class OnceFirst extends OnceAdapter {
	private hasCalled: boolean = false;

	getCallback(): () => void {
		return OnceAdapter.delay(() => {
			if (!this.hasCalled) {
				this.hasCalled = true;
				this.call();
			}
		});
	}
}
