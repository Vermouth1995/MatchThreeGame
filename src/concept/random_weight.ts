export default class RandomWeight<T> {
	constructor() {}

	private factors: T[] = [];
	private weights: number[] = [];
	private totalWeight: number = 0;

	static readonly DEFAULT_WEIGHT = 1;

	addFactor(factor: T, weight: number = RandomWeight.DEFAULT_WEIGHT): RandomWeight<T> {
		if (weight < 0) {
			weight = 0;
		}
		this.factors.push(factor);
		this.totalWeight += weight;
		this.weights.push(this.totalWeight);
		return this;
	}

	getFactor(): T {
		if (this.factors.length == 0) {
			return null;
		}
		const seed: number = Math.random() * this.totalWeight;
		for (let i = 0; i < this.weights.length; i++) {
			if (seed < this.weights[i]) {
				return this.factors[i];
			}
		}

		return null;
	}
}
