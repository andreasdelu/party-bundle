import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import "../styles/DiceGames.css";
import { Link } from "react-router-dom";

//Underside til cardgames, hvor de spil inde i den sektion bliver fremvist og kan trykkes på
export default function CardGames() {
	return (
		<>
			<Header />
			<p className='bodyText'>Choose a game:</p>
			<div className='btnContainer'>
				<Link className='buttonLink' to={"/game/overunder/diff-1"}>
					<Button text={"Over/Under"} />
				</Link>
			</div>
		</>
	);
}
