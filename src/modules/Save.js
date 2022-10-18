function saveStats(key, object) {
	if (window.localStorage.getItem("stats")) {
		let stats = JSON.parse(window.localStorage.getItem("stats"));
		if (stats[`${key}`].value < object.value) {
			stats[`${key}`] = object;
		}
		window.localStorage.setItem("stats", JSON.stringify(stats));
	} else {
		let stats = {};
		stats[`${key}`] = object;
		window.localStorage.setItem("stats", JSON.stringify(stats));
	}
}

function saveTimeTotal() {
	if (window.localStorage.getItem("stats")) {
		let stats = JSON.parse(window.localStorage.getItem("stats"));
		let timePlayed;
		if (stats.timePlayed) {
			timePlayed = {
				minutes: stats.timePlayed.minutes + 1,
			};
		} else {
			timePlayed = {
				minutes: 0,
			};
		}
		stats.timePlayed = timePlayed;
		window.localStorage.setItem("stats", JSON.stringify(stats));
	} else {
		let stats = {};
		let timePlayed = {
			minutes: 0,
		};
		stats.timePlayed = timePlayed;
		window.localStorage.setItem("stats", JSON.stringify(stats));
	}
}
function saveTimeSession() {
	if (window.sessionStorage.getItem("stats")) {
		let stats = JSON.parse(window.sessionStorage.getItem("stats"));
		let timePlayed;
		if (stats.timePlayed) {
			timePlayed = {
				minutes: stats.timePlayed.minutes + 1,
			};
		} else {
			timePlayed = {
				minutes: 0,
			};
		}
		stats.timePlayed = timePlayed;
		window.sessionStorage.setItem("stats", JSON.stringify(stats));
	} else {
		let stats = {};
		let timePlayed = {
			minutes: 0,
		};
		stats.timePlayed = timePlayed;
		window.sessionStorage.setItem("stats", JSON.stringify(stats));
	}
}

export { saveStats, saveTimeTotal, saveTimeSession };
