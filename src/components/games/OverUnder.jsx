import React, { useEffect, useState } from "react";
import Card from "../Card";
import "../../styles/Games.css";
import Button from "../Button";

export default function OverUnder() {
	const [cardSuit, setCardSuit] = useState("");
	const [cardValue, setCardValue] = useState(0);
	const [wins, setWins] = useState(0);
	const [flipped, setFlipped] = useState("");

	let cardValue2;
	let prevValue;

	useEffect(() => {
		spawnCard();
	}, []);

	function spawnCard() {
		const suits = ["hearts", "diamonds", "spades", "clubs"];
		setCardSuit(suits[Math.floor(Math.random() * suits.length)]);
		cardValue2 = Math.floor(Math.random() * 13) + 1;
		setCardValue(cardValue2);
	}

	function over() {
		setFlipped("flipCard");
		setTimeout(() => {
			prevValue = cardValue;
			spawnCard();
			setFlipped("");
			setTimeout(() => {
				if (cardValue2 >= prevValue) {
					setWins(wins + 1);
				} else {
					setWins(0);
				}
			}, 300);
		}, 500);
	}
	function under() {
		setFlipped("flipCard");
		setTimeout(() => {
			prevValue = cardValue;
			spawnCard();
			setFlipped("");
			setTimeout(() => {
				if (cardValue2 <= prevValue) {
					setWins(wins + 1);
				} else {
					setWins(0);
				}
			}, 500);
		}, 500);
	}

	return (
		<>
			<div className='gameContainer'>
				<h1 className='gameTitle'>Over/Under</h1>
				<Card extraClasses={flipped} suit={cardSuit} value={cardValue} />
				<p>Wins: {wins}</p>
				<div className='overunderButtons'>
					<Button onClick={over} text={"Over"} />
					<Button onClick={under} text={"Under"} />
				</div>
			</div>
		</>
	);
}
