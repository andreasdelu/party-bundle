import React from "react";
import "../styles/AddPlayers.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Player from "../components/Player";

export default function AddPlayers() {
	function openDialog() {
		const dialog = document.getElementById("addPlayer");
		dialog.showModal();
		dialog.addEventListener("click", function (event) {
			var rect = dialog.getBoundingClientRect();
			var isInDialog =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width;
			if (!isInDialog) {
				dialog.close();
			}
		});
	}

	return (
		<>
			<Header />
			<p className='bodyText'>Add players:</p>
			<div className='btnContainer'>
				<Player name={"Rune"} image={""} />
				<button onClick={openDialog} className='addButton'>
					+
				</button>
			</div>
			<dialog id='addPlayer'>
				<h2>Add Player:</h2>
				<label htmlFor='playerName'>Enter player name:</label>
				<input type='text' placeholder='Name...' id='playerName' />
				<label htmlFor='uploadPhoto'>Add a picture:</label>
				<input type='file' capture='user' id='uploadPhoto' accept='image/*' />
				<button>Add</button>
			</dialog>
		</>
	);
}
