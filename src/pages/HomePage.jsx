import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import cards from "../assets/cards.svg";
import social from "../assets/social.svg";
import dice from "../assets/dice.svg";
import guldHornene from "../assets/guldhornene.webp";
import controller from "../assets/controller.svg";
import ButtonBig from "../components/ButtonBig";
import Header from "../components/Header";
import ButtonLong from "../components/ButtonLong";
export default function HomePage() {
	return (
		<>
			<Header onlySettings={true} />
			<img id='homeLogo' src={logo} alt='' />
			<p className='bodyText'>Choose a game type:</p>
			{/* Container til alle knapperne på forsiden */}
			<div className='homeContent'>
				<Link className='buttonLink' to={"/cards"}>
					<ButtonBig
						extraStyle={{ size: "51%", dropOpacity: 0 }}
						image={cards}
						text={"Card Games"}
					/>
				</Link>
				<Link className='buttonLink' to={"/dice"}>
					<ButtonBig
						extraStyle={{ size: "48%", dropOpacity: 0.2 }}
						image={dice}
						text={"Dice Games"}
					/>
				</Link>
				<Link className='buttonLink' to={"/social"}>
					<ButtonBig
						extraStyle={{ size: "40%", dropOpacity: 0.2 }}
						image={social}
						text={"Social Games"}
					/>
				</Link>
				<Link className='buttonLink' to={"/mini"}>
					<ButtonBig
						extraStyle={{ size: "55%", dropOpacity: 0 }}
						image={controller}
						text={"Mini Games"}
					/>
				</Link>
				<Link className='buttonLink' to={"/spinwin"}>
					<ButtonLong
						extraStyle={{ size: "45%", dropOpacity: 0 }}
						image={guldHornene}
						text={"Spin N' Win"}
					/>
				</Link>
			</div>
		</>
	);
}
