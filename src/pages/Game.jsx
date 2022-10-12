import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Meyer from "../components/games/Meyer";

export default function Game() {
	const { game, diff } = useParams();
	const [difficulty, setDifficulty] = useState("");

	useEffect(() => {
		setDifficulty(diff.split("-")[1]);
	}, []);

	return (
		<>
			<Header />
			{game === "meyer" && <Meyer diff={difficulty} />}
		</>
	);
}
