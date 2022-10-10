import React from "react";
import "../styles/HomePage.css";
import logo from "../assets/logo.svg";
import cog from "../assets/gear.svg";
import cards from "../assets/cards.svg";
import dice from "../assets/dice.svg";
import controller from "../assets/controller.svg";
import ButtonBig from "../components/ButtonBig";
export default function HomePage() {
	return (
		<>
			<img id='homeLogo' src={logo} alt='' />
			<img id='homeCog' src={cog} alt='' />
			<p className='bodyText'>Choose a game type:</p>
			<div className='homeContent'>
				<ButtonBig image={cards} text={"Card Games"} />
				<ButtonBig image={dice} text={"Dice Games"} />
				<ButtonBig image={cards} text={"Board Games"} />
				<ButtonBig size={"70%"} image={controller} text={"Mini Games"} />
			</div>
		</>
	);
}
