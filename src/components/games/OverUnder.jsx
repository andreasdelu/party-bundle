import React, { useState } from "react";
import Card from "../Card";
import "../../styles/Games.css";
import Button from "../Button";
import Dialog from "../Dialog";

import { saveStats } from "../../modules/Save";

export default function OverUnder() {
	const suits = ["hearts", "diamonds", "spades", "clubs"];
	const [cardSuit, setCardSuit] = useState(
		suits[Math.floor(Math.random() * suits.length)]
	);
	const [cardValue, setCardValue] = useState(
		Math.floor(Math.random() * 13) + 1
	);
	const [wins, setWins] = useState(0);
	const [flipped, setFlipped] = useState("");
	const [buttons, setButtons] = useState(true);
	const [scoreDialog, setScoreDialog] = useState(false);

	let cardValue2;
	let prevValue;

	//Sørger for at næste kort er tilfældigt
	function spawnCard() {
		setCardSuit(suits[Math.floor(Math.random() * suits.length)]);
		cardValue2 = Math.floor(Math.random() * 13) + 1;
		setCardValue(cardValue2);
	}

	//Håndterer når brugeren trykker på "over" knappen
	//Skifter kortet når det animarer om til bagsiden
	function over() {
		setFlipped("flipCard");
		setButtons(false);
		setTimeout(() => {
			prevValue = cardValue;
			spawnCard();
			setFlipped("");
			setTimeout(() => {
				if (cardValue2 >= prevValue) {
					setWins(wins + 1);
					setFlipped("winCard");
				} else {
					gameEnd();
					setFlipped("loseCard");
				}
				setButtons(true);
				setTimeout(() => {
					setFlipped("");
				}, 600);
			}, 300);
		}, 600);
	}

	//Håndterer når brugeren trykker på "under" knappen
	//Skifter kortet når det animarer om til bagsiden
	function under() {
		setFlipped("flipCard");
		setButtons(false);
		setTimeout(() => {
			prevValue = cardValue;
			spawnCard();
			setFlipped("");
			setTimeout(() => {
				if (cardValue2 <= prevValue) {
					setWins(wins + 1);
					setFlipped("winCard");
				} else {
					gameEnd();
					setFlipped("loseCard");
				}
				setButtons(true);
				setTimeout(() => {
					setFlipped("");
				}, 600);
			}, 300);
		}, 600);
	}

	//Viser en dialogboks med brugerens score når brugeren gætter forkert
	function gameEnd() {
		setButtons(false);
		setScoreDialog(true);
		saveStats("overunder", {
			name: "Higher/Lower",
			value: wins,
			valueName: "wins",
		});
	}

	//Håndterer at starte et nyt spil ved at reset alt i spillet
	function newGame() {
		setWins(0);
		setScoreDialog(false);
		setFlipped("flipCard");
		setTimeout(() => {
			spawnCard();
			setFlipped("");
			setTimeout(() => {
				setButtons(true);
			}, 400);
		}, 500);
	}

	return (
		<>
			<div className='gameContainer'>
				<h1 className='gameTitle'>Higher/Lower</h1>
				<Card extraClasses={flipped} suit={cardSuit} value={cardValue} />
				<p>
					Wins: {wins}
					{wins > 5 && "🔥"}
				</p>
				<div className='overunderButtons'>
					{buttons ? (
						<>
							<Button onClick={over} text={"Higher"} />
							<Button onClick={under} text={"Lower"} />
						</>
					) : (
						<>
							<Button
								classes={"buttonDisabled"}
								onClick={over}
								text={"Higher"}
							/>
							<Button
								classes={"buttonDisabled"}
								onClick={under}
								text={"Lower"}
							/>
						</>
					)}
				</div>
			</div>
			{/* Dialogboks der viser hvor mange rigtige brugeren fik */}
			<Dialog
				id={"scoreDialog"}
				isOpen={scoreDialog}
				dialogContent={
					<div className='dialogContainer'>
						{wins <= 3 && (
							<>
								<h2>Unlucky!</h2>
								<p className='textBody'>
									You guessed correctly {wins} times <br />
									Better luck next time!
								</p>
							</>
						)}
						{wins >= 4 && wins <= 9 && (
							<>
								<h2>Good job!</h2>
								<p className='textBody'>
									You guessed correctly {wins} times <br />
									That's pretty good!
								</p>
							</>
						)}
						{wins >= 10 && (
							<>
								<h2>Insane!</h2>
								<p className='textBody'>
									You guessed correctly {wins} times <br />
									Your skill (luck) is crazy!
								</p>
							</>
						)}
						<Button
							onClick={() => {
								newGame();
							}}
							classes={"fitWidth"}
							text={"Try again!"}
						/>
					</div>
				}
			/>
		</>
	);
}
