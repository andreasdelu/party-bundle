import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
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
				<ButtonBig
					extraStyle={{ size: "50%", dropOpacity: 0 }}
					image={cards}
					text={"Card Games"}
				/>
				<Link className='buttonLink' to={"/dice"}>
					<ButtonBig
						extraStyle={{ size: "50%", dropOpacity: 0.2 }}
						image={dice}
						text={"Dice Games"}
					/>
				</Link>
				<ButtonBig
					extraStyle={{ size: "50%", dropOpacity: 0 }}
					image={cards}
					text={"Board Games"}
				/>
				<ButtonBig
					extraStyle={{ size: "70%", dropOpacity: 0 }}
					image={controller}
					text={"Mini Games"}
				/>
			</div>
		</>
	);
}
