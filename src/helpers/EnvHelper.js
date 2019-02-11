export default class EnvHelper {

	static initHistory(history) {
		this.historyValue = history;
	}

	static get history() {
		return this.historyValue;
	}

	static push(path) {
		if (this.history) {
			this.history.push(path);
		}
	}
}
