import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Meyer from "../components/games/Meyer";
import ReactionGame from "../components/games/ReactionGame";
import Never from "../components/games/Never";
import Pictionary from "../components/games/Pictionary";
import OverUnder from "../components/games/OverUnder";
import SpinTheBottle from "../components/games/SpinTheBottle";

//Regler som er i burgermenuen viser hvordan man spillet spillet. Det ændre sig, efter hvilket spil brugeren er inde på.
import rules from "../components/games/rules.json";

export default function Game() {
	const { game, diff } = useParams();
	const [difficulty, setDifficulty] = useState("");

	//Implementerer difficulty koden
	useEffect(() => {
		setDifficulty(diff.split("-")[1]);
	}, [diff]);

	//Definere hvad overskriften er på reglerne. Fx hvis du er inde på meyer, så er overskriften meyer osv.
	const [currentRule] = useState(() => {
		for (let i = 0; i < rules.length; i++) {
			if (rules[i].name === game) {
				return rules[i];
			}
		}
	});

	//Liste over overskrifterne, så det er nemmere at sætte ind
	return (
		<>
			<Header showRules={true} ruleContent={currentRule} />
			{game === "meyer" && <Meyer diff={difficulty} />}
			{game === "speed" && <ReactionGame diff={difficulty} />}
			{game === "pictionary" && <Pictionary diff={difficulty} />}
			{game === "never" && <Never diff={difficulty} />}
			{game === "overunder" && <OverUnder diff={difficulty} />}
			{game === "spin" && <SpinTheBottle diff={difficulty} />}
		</>
	);
}
