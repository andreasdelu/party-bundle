import React, { useEffect, useState } from "react";

import "../../styles/Games.css";
import "../../styles/Never.css";

export default function Never() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function fetchQuestions() {
			const url =
				"https://party-bundle-default-rtdb.europe-west1.firebasedatabase.app/never/en.json";
			const res = await fetch(url);
			const data = await res.json();
			setQuestions(data);
		}

		fetchQuestions();
	}, []);

	let stack = document.querySelector(".stack");

	[...stack.children].reverse().forEach((i) => stack.append(i));

	stack.addEventListener("click", swap);

	function swap(e) {
		let card = document.querySelector(".card:last-child");
		if (e.target !== card) return;
		card.style.animation = "swap 700ms forwards";

		setTimeout(() => {
			card.style.animation = "";
			stack.prepend(card);
		}, 700);
	}

	return (
		<>
			<h1 className='gameTitle'>Never Have I Ever</h1>
			<ul>
				{questions.map((question, index) =>
					question ? <li key={index}>{question}</li> : null
				)}
			</ul>
			<div className='stack'>
				<div className='card'>1</div>
				<div className='card'>2</div>
				<div className='card'>3</div>
				<div className='card'>4</div>
				<div className='card'>5</div>
				<div className='card'>6</div>
			</div>
		</>
	);
}
