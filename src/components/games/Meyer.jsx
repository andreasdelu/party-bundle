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
	const [terning1, setTerning1] = useState(diceHidden);
	const [terning2, setTerning2] = useState(diceHidden);
	const [value, setValue] = useState("Roll the dice!");
	const [newGame, setNewGame] = useState(true);
	const [haveRolled, setHaveRolled] = useState(false);
	const [nextPlayer, setNextPLayer] = useState(false);
	const [lift, setLift] = useState(false);
	const [above, setAbove] = useState(false);
	const [count, setCount] = useState(1);
	let terninger = [dice1, dice2, dice3, dice4, dice5, dice6];

	function rollDice() {
		if (count >= 2) {
			setAbove(true);
		} else {
			setAbove(false);
		}

		console.log(count);

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
			setValue("Cheers!");
		}

		setNewGame(false);
		setHaveRolled(true);
		setNextPLayer(false);
		setLift(false);
	}

	function next() {
		setNewGame(false);
		setHaveRolled(false);
		setNextPLayer(true);
		setLift(false);
		setAbove(false);

		setTerning1(diceHidden);
		setTerning2(diceHidden);

		setValue("Kurt's tur");
	}

	function liftCup() {
		setNewGame(false);
		setHaveRolled(false);
		setNextPLayer(false);
		setLift(true);
		setAbove(false);
	}

	function itOrAbove() {
		setNewGame(false);
		setHaveRolled(false);
		setNextPLayer(false);
		setLift(false);
		setAbove(true);
	}

	return (
		<>
			<div className='game__container'>
				<h1 className='gameTitle'>Meyer</h1>
				<div className='terninger'>
					<img className='dice' src={terning1} alt='terning' />
					<img className='dice' src={terning2} alt='terning' />
				</div>
				<div className='buttons'>
					<h2>{value}</h2>

					{newGame && (
						<>
							<Button
								onClick={() => {
									setCount(count + 1);
									rollDice();
								}}
								text={"Roll!"}
							/>
							<Button onClick={nextPlayer} text={"Next player"} />
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
							<Button
								onClick={() => {
									setCount(count + 1);
									rollDice();
								}}
								text={"Roll!"}
							/>
							<Button onClick={liftCup} text={"Lift"} />
							<Button classes={"buttonDisabled"} text={"It og above"} />
						</>
					)}

					{lift && (
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
							<Button onClick={next} text={"It og above"} />
						</>
					)}

					{above && (
						<>
							<Button onClick={itOrAbove} text={"It og above"} />
						</>
					)}
				</div>
			</div>
		</>
	);
}
