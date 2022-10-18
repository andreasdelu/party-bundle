
function saveStats(value, object){
    if (window.localStorage.getItem("stats")) {
        let stats = JSON.parse(window.localStorage.getItem("stats"));
        if (stats.overunder.wins < value) {
            stats.overunder.wins = value;
            window.localStorage.setItem("stats", JSON.stringify(stats));
        }
    } else {
        let stats = {
            overunder: { name: "Over/Under", wins: value },
        };
        window.localStorage.setItem("stats", JSON.stringify(stats));
    }

}

export {saveStats}