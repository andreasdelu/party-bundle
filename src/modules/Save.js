//Checker om der er gemte stats i forvejen og gemmer/opdaterer så i localStorage
function saveStats(key, object) {
	if (window.localStorage.getItem("stats")) {
		let stats = JSON.parse(window.localStorage.getItem("stats"));
		if (stats.hiscores) {
			if (key === "reaction") {
				if (!stats.hiscores[key] || stats.hiscores[key].value > object.value) {
					stats.hiscores[key] = object;
				}
			} else {
				if (!stats.hiscores[key] || stats.hiscores[key].value < object.value) {
					stats.hiscores[key] = object;
				}
			}
		} else {
			stats.hiscores = {};
			stats.hiscores[key] = object;
		}
		window.localStorage.setItem("stats", JSON.stringify(stats));
	} else {
		let stats = {};
		stats.hiscores[key] = object;
		window.localStorage.setItem("stats", JSON.stringify(stats));
	}
}

//Gammer den totale spilletid i localStorage
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

//Gemmer spilletid denne spilsession i sessionStorage
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
