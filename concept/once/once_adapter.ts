import Once from "../once";
export default abstract class OnceAdapter implements Once {
	abstract getCallback(): () => void;
	setCallback(callback: () => void): Once {
		this.callback = callback;
		return this;
	}
	protected callback: () => void;

	static delay(called: () => void): () => void {
		return () => {
			setTimeout(called, 0);
		};
	}

	protected call() {
		if (this.callback != null) {
			this.callback();
		}
	}
}
