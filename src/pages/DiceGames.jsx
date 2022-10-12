import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import "../styles/DiceGames.css";
import { Link } from "react-router-dom";

export default function DiceGames() {
	return (
		<>
			<Header />
			<p className='bodyText'>Choose a game:</p>
			<div className='btnContainer'>
				<Link className='buttonLink' to={"/game/meyer/players"}>
					<Button text={"Meyer"} />
				</Link>
				<Button text={"Snyd"} />
			</div>
		</>
	);
}
