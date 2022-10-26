import React, { useEffect, useRef, useState } from "react";

import "../../styles/Games.css";
import "../../styles/Never.css";

export default function Never() {
	const [allQuestions, setAllQuestions] = useState([]);

	let filteredQuestions = [];

	const stackRef = useRef(null);

	// Fetcher alle spørgsmål fra databasen
	useEffect(() => {
		async function fetchQuestions() {
			const url =
				"https://party-bundle-default-rtdb.europe-west1.firebasedatabase.app/never/en.json";
			const res = await fetch(url);
			const data = await res.json();
			setAllQuestions(data);
		}

		fetchQuestions();
	}, []);

	//Sætter spørgsmål på de første 4 kort ved page load
	useEffect(() => {
		let stack = stackRef.current;
		if (stackRef && allQuestions.length) {
			filteredQuestions = allQuestions;
			stack.addEventListener("click", swap, false);
			const cards = [...stackRef.current.children];
			cards.forEach((card) => {
				card.innerText = randomQuestion();
			});
		}
		return () => {
			stack.removeEventListener("click", swap, false);
		};
	}, [allQuestions]);

	//Håndterer at skifte til næste kort
	function swap(e) {
		let card = document.querySelector(".card:last-child");
		if (e.target !== card) return;
		card.style.animation = "swap 700ms forwards";

		setTimeout(() => {
			card.style.animation = "";
			stackRef.current.prepend(card);
			document.querySelector(".card:first-child").innerText = randomQuestion();
		}, 700);
	}

	//Tager et tilfældigt spørgsmål fra listen af spørgsmål, fjerner det fra listen og returner det
	function randomQuestion() {
		if (!filteredQuestions.length) {
			filteredQuestions = allQuestions;
		}
		const rnd = Math.floor(Math.random() * filteredQuestions.length);
		const q = filteredQuestions[rnd];
		filteredQuestions = filteredQuestions.filter((question, i) => i !== rnd);
		return q;
	}

	return (
		<>
			<h1 className='gameTitle'>Never Have I Ever</h1>
			<div style={{ zIndex: 0 }} ref={stackRef} className='stack'>
				<div className='card'>Loading...</div>
				<div className='card'>Loading...</div>
				<div className='card'>Loading...</div>
				<div className='card'>Loading...</div>
			</div>
		</>
	);
}
