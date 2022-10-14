import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Meyer from "../components/games/Meyer";
import ReactionGame from "../components/games/ReactionGame";
import Never from "../components/games/Never";
import Pictionary from "../components/games/Pictionary";

export default function Game() {
	const { game, diff } = useParams();
	const [difficulty, setDifficulty] = useState("");

	useEffect(() => {
		setDifficulty(diff.split("-")[1]);
	}, [diff]);

	return (
		<>
			<Header />
			{game === "meyer" && <Meyer diff={difficulty} />}
			{game === "reaction" && <ReactionGame diff={difficulty} />}
			{game === "pictionary" && <Pictionary diff={difficulty} />}
			{game === "never" && <Never diff={difficulty} />}
		</>
	);
}
