import Once from "../once";
export default abstract class OnceAdapter implements Once {
	abstract getCallback(): () => void;
	setCallback(callback: () => void) {
		this.callback = callback;
	}
	protected callback: () => void;

	protected delay(called: () => void): () => void {
		return function() {
			setTimeout(called, 0);
		};
	}

	protected call() {
		if (this.callback != null) {
			this.callback();
		}
	}
}
