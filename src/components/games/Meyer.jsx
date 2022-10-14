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

	let terninger = [dice1, dice2, dice3, dice4, dice5, dice6];

	function rollDice() {
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
					<Button onClick={rollDice} text={"Roll Dice"} />
					<Button onClick={rollDice} text={"Send videre"} />
					<Button onClick={rollDice} text={"Løft"} />
				</div>
			</div>
		</>
	);
}
