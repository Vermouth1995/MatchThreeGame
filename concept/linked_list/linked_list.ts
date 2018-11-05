import Node from "./node";

export default class LinkedList<T> {
	constructor() {}

	static readonly IndexStep: number = 1;

	private head: Node<T> = null;
	private tail: Node<T> = null;
	private length: number = 0;

	get(index: number): T {
		let now: Node<T> = this.head;
		let indexNow: number = 0;
		while (now != null) {
			if (index == indexNow) {
				return now.data;
			}
			now = now.next;
		}
		return null;
	}

	iterate(onElement: (index: number, element: T) => void) {
		let now: Node<T> = this.head;
		let indexNow: number = 0;
		while (now != null) {
			onElement(indexNow, now.data);
			now = now.next;
		}
	}

	isEmpty(): boolean {
		return this.length == 0;
	}

	size(): number {
		return this.length;
	}

	append(element: T) {
		let newNode: Node<T> = new Node<T>();
		newNode.data = element;

		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
			this.length++;
			return;
		}
		this.tail.next = newNode;
		this.tail = newNode;
		this.length++;
	}

	deduct(): T {
		if (this.length == 0) {
			return null;
		}
		let data: T = this.tail.data;
		if (this.tail == this.head) {
			this.head = null;
			this.tail = null;
			this.length--;
			return data;
		}
		let previous: Node<T> = this.getNodePrevious(this.length - LinkedList.IndexStep);
		previous.next = null;
		this.tail = previous;
		this.length--;
		return data;
	}

	shift(element: T) {
		let newNode: Node<T> = new Node<T>();
		newNode.data = element;

		if (this.isEmpty()) {
			this.head = newNode;
			this.tail = newNode;
			this.length++;
			return;
		}
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
	}

	unshift(): T {
		if (this.length == 0) {
			return null;
		}
		let data: T = this.head.data;
		if (this.head == this.tail) {
			this.tail = null;
			this.head = null;
			this.length--;
			return data;
		}
		this.head = this.head.next;
		this.length--;
		return data;
	}

	insert(position: number, element: T) {
		if (position <= 0) {
			this.shift(element);
			return;
		}
		if (position >= this.length) {
			this.append(element);
			return;
		}

		this.length++;
		let insertNode: Node<T> = new Node<T>();
		insertNode.data = element;
		let previous: Node<T> = this.getNodePrevious(position);
		insertNode.next = previous.next;
		previous.next = insertNode;
	}

	removeAt(position: number): T {
		if (position < 0 || position >= this.length) {
			return null;
		}
		if (position == 0) {
			return this.unshift();
		}
		if (position == this.length - LinkedList.IndexStep) {
			return this.deduct();
		}
		let previous: Node<T> = this.getNodePrevious(position);
		let data = previous.next.data;
		previous.next = previous.next.next;
		this.length--;
		return data;
	}

	remove(element: T, equal: (left: T, right: T) => boolean = this.indexOfEqual) {
		if (this.length == 0) {
			return;
		}
		if (equal(element, this.head.data)) {
			this.head = this.head.next;
			this.length--;
			if ((this.length = 0)) {
				this.tail = null;
			}
			return;
		}

		let previous: Node<T> = null;
		let current: Node<T> = this.head;
		while (current != null) {
			if (equal(current.data, element)) {
				break;
			}
			current = current.next;
		}

		if (current == null) {
			return;
		}
		previous.next = current.next;
		this.length--;
		if (current == this.tail) {
			this.tail = previous;
		}
	}

	indexOf(element: T, equal: (left: T, right: T) => boolean = this.indexOfEqual): number {
		let current: Node<T> = this.head;
		let index: number = 0;

		while (current != null) {
			if (equal(current.data, element)) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}

	private getNodePrevious(position: number): Node<T> {
		if (position <= 0 || position > this.length) {
			return null;
		}

		let index: number = 1;
		let previous: Node<T> = this.head;
		while (index < position) {
			previous = previous.next;
			index++;
		}

		return previous;
	}

	private indexOfEqual(left: T, right: T): boolean {
		return left == right;
	}
}
