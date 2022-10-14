import React, { useEffect, useState } from "react";

import "../../styles/Games.css";

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

	return (
		<>
			<h1 className='gameTitle'>Never Have I Ever</h1>
			<ul>
				{questions.map((question, index) =>
					question ? <li key={index}>{question}</li> : null
				)}
			</ul>
		</>
	);
}
