import React from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import "../styles/DiceGames.css";
import { Link } from "react-router-dom";

export default function SocialGames() {
	return (
		<>
			<Header />
			<p className='bodyText'>Choose a game:</p>
			<div className='btnContainer'>
				<Link className='buttonLink' to={"/game/never/diff-1"}>
					<Button text={"Never Have I Ever"} />
				</Link>
				<Link className='buttonLink' to={"/game/pictionary/players"}>
					<Button text={"Pictionary"} />
				</Link>
				<Link className='buttonLink' to={"/game/spin/players"}>
					<Button text={"Spin The Bottle"} />
				</Link>
			</div>
		</>
	);
}
