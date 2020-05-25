import OnceAdapter from "./once_adapter";
export default class OnceLast extends OnceAdapter {
	private counter: number = 0;

	getCallback(): () => void {
		this.counter++;
		return OnceAdapter.delay(() => {
			this.counter--;
			if (this.counter == 0) {
				this.call();
			}
		});
	}
}
