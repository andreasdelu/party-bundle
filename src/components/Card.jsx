import React, { useEffect, useState } from "react";
import "../styles/PlayingCard.css";
import hearts from "../assets/cards/hearts.svg";
import clubs from "../assets/cards/clubs.svg";
import spades from "../assets/cards/spades.svg";
import diamonds from "../assets/cards/diamonds.svg";
import logo from "../assets/logo.svg";

export default function Card({ suit, value, extraClasses }) {
	const [currentSuit, setCurrentSuit] = useState(null);
	const [currentColor, setCurrentColor] = useState("");
	const [currentValue, setCurrentValue] = useState("10");

	useEffect(() => {
		switch (suit) {
			case "hearts":
				setCurrentSuit(hearts);
				setCurrentColor("#e20e18");
				break;
			case "clubs":
				setCurrentSuit(clubs);
				setCurrentColor("black");
				break;
			case "spades":
				setCurrentSuit(spades);
				setCurrentColor("black");
				break;
			case "diamonds":
				setCurrentSuit(diamonds);
				setCurrentColor("#e20e18");
				break;

			default:
				break;
		}
		switch (value) {
			case 14: //Joker
				setCurrentValue("Joker");
				break;
			case 1: //Ace
				setCurrentValue("A");
				break;
			case 13: //King
				setCurrentValue("K");
				break;
			case 12: //Queen
				setCurrentValue("Q");
				break;
			case 11: //Jack
				setCurrentValue("J");
				break;

			default:
				setCurrentValue(value.toString());
				break;
		}
	}, [value, suit]);

	return (
		<>
			<div className='playingCard'>
				<div className={`playingCardInner ${extraClasses}`}>
					<div className='playingCardFront'>
						<div className='playingCardTop'>
							<p
								style={{ color: `${currentColor}` }}
								className='playingCardValue'>
								{currentValue}
							</p>
							<img className='playingCardSuit' src={currentSuit} alt='suit' />
						</div>
						<div className='playingCardMid'>
							<img className='playingCardSuit' src={currentSuit} alt='suit' />
						</div>
						<div className='playingCardBot'>
							<img className='playingCardSuit' src={currentSuit} alt='suit' />
							<p
								style={{ color: `${currentColor}` }}
								className='playingCardValue'>
								{currentValue}
							</p>
						</div>
					</div>
					<div className='playingCardBack'>
						<div className='cardBackImage'>
							<img src={logo} alt='logo' />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
