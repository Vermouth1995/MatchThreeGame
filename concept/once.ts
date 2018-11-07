export default interface Once {
	getCallback(): () => void;
	setCallback(callback: () => void):void;
}
