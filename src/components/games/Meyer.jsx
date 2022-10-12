import React from "react";
import "../../styles/Games.css";

export default function Meyer({ diff }) {
	return (
		<>
			<h1 className='gameTitle'>Meyer</h1>
			<small>Difficulty: {diff}</small>
		</>
	);
}
