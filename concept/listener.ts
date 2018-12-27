export default interface ListenerAdapter<B, T extends (...args: any[]) => B> {
	on(listener: T): void;
	cut(listener: T): void;
	clear(): void;
	trigger(...args: any[]): B;
}
