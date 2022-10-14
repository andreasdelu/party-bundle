import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import "../../styles/Drawing.css";
import Player from "../Player";
import Dialog from "../Dialog";

export default function Pictionary() {
	const canvasRef = useRef(null);

	const [turn, setTurn] = useState(0);
	const [players, setPlayers] = useState([]);
	const [show, setShow] = useState(false);

	const [guessDialog, setGuessDialog] = useState(false);
	const [turnDialog, setTurnDialog] = useState(true);

	useEffect(() => {
		canvasRef.current.width = window.innerWidth - 40;
		canvasRef.current.height = window.innerWidth - 40;
		const ctx = canvasRef.current.getContext("2d");
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.width);

		setPlayers(JSON.parse(sessionStorage.getItem("players")));
	}, []);

	function handleGuess(e) {
		e.preventDefault();
		console.log(e.target.guess.value);
	}

	function nextTurn() {
		if (turn + 1 === players.length) {
			setTurn(0);
		} else {
			setTurn(turn + 1);
		}
		if (turnDialog) {
			setTurnDialog(false);
		}
		setTurnDialog(true);
	}

	function showWord(e) {
		if (!show) {
			setShow(true);
			setTimeout(() => {
				setShow(false);
			}, 1500);
		} else {
			setShow(true);
		}
	}

	return (
		<>
			<h1 className='gameTitle'>Drawing</h1>
			<canvas ref={canvasRef} id='drawingCanvas'></canvas>
			{/* <small
				style={{ textAlign: "center", margin: "8px auto", display: "block" }}>
				Players: {players.length}
			</small> */}
			<div className='drawer'>
				{players.length && (
					<p style={{ margin: 0 }} className='bodyText'>
						<b>{players[turn].name}</b> is drawing!
					</p>
				)}
			</div>
			<div className='wordContainer'>
				<p className='drawWord'>"Harsk"</p>
				{!show && (
					<div onClick={showWord} className='wordHide'>
						Show Word
					</div>
				)}
			</div>
			<button onClick={nextTurn}>Next</button>

			<Dialog
				id={"guessDialog"}
				isOpen={guessDialog}
				closeClick={() => setGuessDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>Guess the word</h2>
						<form
							id='wordGuess'
							onSubmit={(e) => {
								setGuessDialog(false);
								handleGuess(e);
							}}>
							<label htmlFor='inputGuess'>Your guess:</label>
							<input
								type='text'
								name='guess'
								id='inputGuess'
								placeholder='Word'
								autoComplete='off'
								required
							/>
							<button type='submit' className='dialogBtn'>
								<Button classes={"fitWidth"} text={"Guess"} />
							</button>
						</form>
					</div>
				}
			/>
			<Dialog
				id={"turnDialog"}
				isOpen={turnDialog}
				closeClick={() => setTurnDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>You're up!</h2>
						<br />
						{players.length && (
							<Player
								removable={false}
								key={players[turn].id}
								id={players[turn].id}
								name={players[turn].name}
								image={players[turn].image}
							/>
						)}
						<br />
						<Button
							onClick={() => {
								setTurnDialog(false);
							}}
							classes={"fitWidth"}
							text={"Ready!"}
						/>
					</div>
				}
			/>
		</>
	);
}
