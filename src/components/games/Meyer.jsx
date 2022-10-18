import React, { useState } from "react";
import "../../styles/Games.css";
import "../../styles/meyer.css";
import Button from "../Button";

import dice1 from "../../assets/terninger/dice-one.svg";
import dice2 from "../../assets/terninger/dice-two.svg";
import dice3 from "../../assets/terninger/dice-three.svg";
import dice4 from "../../assets/terninger/dice-four.svg";
import dice5 from "../../assets/terninger/dice-five.svg";
import dice6 from "../../assets/terninger/dice-six.svg";
import diceHidden from "../../assets/terninger/dice-spgs.svg";

export default function Meyer({ diff }) {
	const [terning1, setTerning1] = useState(dice1);
	const [terning2, setTerning2] = useState(dice2);
	const [hidden, setHidden] = useState(true);
	const [value, setValue] = useState("Roll the dice!");
	const [newGame, setNewGame] = useState(true);
	const [haveRolled, setHaveRolled] = useState(false);
	const [nextPlayer, setNextPLayer] = useState(false);
	const [lift, setLift] = useState(false);
	const [above, setAbove] = useState(false);
	const [itOrOver, setItOrOver] = useState(false);
	const [cheers, setCheers] = useState(false);
	const [count, setCount] = useState(1);
	const [shake, setShake] = useState("");
	let terninger = [dice1, dice2, dice3, dice4, dice5, dice6];

	function rollDice() {
		resetAll();
		animate();

		if (count >= 2) {
			setAbove(true);
		} else {
			setAbove(false);
		}

		let rnd = Math.floor(Math.random() * 6);
		let rnd2 = Math.floor(Math.random() * 6);
		setTerning1(terninger[rnd]);
		setTerning2(terninger[rnd2]);

		if (rnd > rnd2) {
			setValue(`${rnd + 1}${rnd2 + 1}`);
		} else if (rnd2 > rnd) {
			setValue(`${rnd2 + 1}${rnd + 1}`);
		} else if (rnd === rnd2) {
			setValue(`Par ${rnd + 1}`);
		}

		if ((rnd + 1) * 10 + rnd2 + 1 === 21 || (rnd2 + 1) * 10 + rnd + 1 === 21) {
			setValue("Meyer!");
		}
		if ((rnd + 1) * 10 + rnd2 + 1 === 31 || (rnd2 + 1) * 10 + rnd + 1 === 31) {
			setValue("Little Meyer!");
		}
		if ((rnd + 1) * 10 + rnd2 + 1 === 32 || (rnd2 + 1) * 10 + rnd + 1 === 32) {
			setCheers(true);
			setValue("Cheers!");
			setHaveRolled(false);
			setHidden(false);

			return;
		}

		setHaveRolled(true);
		setHidden(false);
	}

	function resetAll() {
		setNewGame(false);
		setHaveRolled(false);
		setNextPLayer(false);
		setLift(false);
		setAbove(false);
		setItOrOver(false);
		setCheers(false);
		setNewGame(false);
	}

	function next() {
		resetAll();
		setNextPLayer(true);
		setHidden(true);
		setValue("Next player");
	}

	function liftCup() {
		resetAll();
		setLift(true);
		setValue("Cups liftet");
		setHidden(false);
	}

	function itOver() {
		resetAll();
		setItOrOver(true);
		rollDice();
		next();
		setValue("It or above");
	}

	function newGameAgain() {
		resetAll();
		setNewGame(true);
		setCount(1);
		setHidden(true);
	}

	function animate() {
		setShake("shake");

		setTimeout(() => {
			setShake("");
		}, 400);
	}

	return (
		<>
			<div className='game__container'>
				<h1 className='gameTitle'>Meyer</h1>
				<div className={"terninger " + shake}>
					<div className='diceCont'>
						<img className='dice' src={terning1} alt='terning' />
						{hidden && (
							<>
								<img
									className='dice hiddenDice'
									src={diceHidden}
									alt='terning'
								/>
							</>
						)}
					</div>
					<div className='diceCont'>
						<img className='dice' src={terning2} alt='terning' />
						{hidden && (
							<>
								<img
									className='dice hiddenDice'
									src={diceHidden}
									alt='terning'
								/>
							</>
						)}
					</div>
				</div>
				{!cheers ? (
					<div className='buttons'>
						<h2>{value}</h2>

						{newGame && (
							<>
								<Button
									class='roll'
									onClick={() => {
										setCount(count + 1);
										rollDice();
									}}
									text={"Roll!"}
								/>

								<Button
									classes={"buttonDisabled"}
									onClick={next}
									text={"Next player"}
								/>
							</>
						)}

						{haveRolled && (
							<>
								<Button
									onClick={() => {
										setCount(count + 1);
										rollDice();
									}}
									classes={"buttonDisabled"}
									text={"Roll!"}
								/>
								<Button onClick={next} text={"Next player"} />
							</>
						)}

						{nextPlayer && (
							<>
								<Button onClick={rollDice} text={"Roll!"} />
								<Button onClick={liftCup} text={"Lift"} />
								<Button classes={"buttonDisabled"} text={"It og above"} />
							</>
						)}

						{lift && (
							<>
								<Button
									onClick={() => {
										newGameAgain();
									}}
									text={"New game"}
								/>

								<Button classes={"buttonDisabled"} text={"Lift"} />

								<Button classes={"buttonDisabled"} text={"It og above"} />
							</>
						)}

						{above && (
							<>
								<Button onClick={itOver} text={"It og above"} />
							</>
						)}

						{itOrOver && (
							<>
								<Button
									onClick={() => {
										setCount(count + 1);
										rollDice();
									}}
									text={"Roll!"}
								/>
								<Button onClick={liftCup} text={"Lift"} />
								<Button
									classes={"buttonDisabled"}
									onClick={itOver}
									text={"It og above"}
								/>
							</>
						)}
					</div>
				) : (
					<div className='buttons'>
						<h2>{value}</h2>
						<>
							<Button
								onClick={() => {
									newGameAgain();
								}}
								text={"New game"}
							/>
						</>
					</div>
				)}
			</div>
		</>
	);
}
