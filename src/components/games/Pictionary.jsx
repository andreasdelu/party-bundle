import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import "../../styles/Drawing.css";
import Player from "../Player";
import Dialog from "../Dialog";
import backspace from "../../assets/backspace.svg";

export default function Pictionary() {
	const canvasRef = useRef(null);
	const canvasContainer = useRef(null);

	const [turn, setTurn] = useState(0);
	const [players, setPlayers] = useState([]);
	const [show, setShow] = useState(false);

	const [guessDialog, setGuessDialog] = useState(false);
	const [turnDialog, setTurnDialog] = useState(true);

	const [words, setWords] = useState([]);
	const [currentWord, setCurrentWord] = useState("Harsk");

	const defaultWidth = 6;
	const defaultColor = "#000000";
	const [penWidth, setPenWidth] = useState(defaultWidth);
	const [penColor, setPenColor] = useState(defaultColor);

	const [bgs, setBgs] = useState([]);

	useEffect(() => {
		canvasRef.current.width = window.innerWidth - 40;
		canvasRef.current.height = canvasRef.current.width;

		setPlayers(JSON.parse(sessionStorage.getItem("players")));

		async function fetchWords() {
			const url =
				"https://party-bundle-default-rtdb.europe-west1.firebasedatabase.app/pictionary/en.json";
			const res = await fetch(url);
			const data = await res.json();
			setWords(data);
		}

		fetchWords();
	}, []);

	useEffect(() => {
		let rnd = Math.floor(Math.random() * words.length);
		setCurrentWord(words[rnd]);
	}, [words]);

	useEffect(() => {}, [bgs]);

	function setGuessWord() {
		let rnd = Math.floor(Math.random() * words.length);
		setCurrentWord(words[rnd]);
	}

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
		setGuessWord();
		setBgs([]);
		setPenColor(defaultColor);
		setPenWidth(defaultWidth);
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

	let points = [];

	function canvasLoad() {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!points.length) return;
		points.forEach((point, i) => {
			if (points.length > 1) {
				if (i === 0) {
					ctx.beginPath();
					ctx.moveTo(points[i + 1].x, points[i + 1].y);
					ctx.lineTo(point.x, point.y);
				} else {
					ctx.beginPath();
					ctx.moveTo(points[i - 1].x, points[i - 1].y);
					ctx.lineTo(point.x, point.y);
				}
			} else {
				ctx.beginPath();
				ctx.moveTo(points.x, points.y);
				ctx.lineTo(point.x, point.y);
			}
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = point.w;
			ctx.strokeStyle = point.col;
			ctx.stroke();
		});
	}

	function drawLine(e) {
		const canvas = canvasContainer.current;
		const x = e.targetTouches[0].clientX;
		const y = e.targetTouches[0].clientY;

		points.push({
			x: Math.floor(x - canvas.offsetLeft),
			y: Math.floor(y - canvas.offsetTop),
			w: penWidth,
			col: penColor,
		});

		canvasLoad();
	}

	function back() {
		if (bgs.length > 1) {
			setBgs(bgs.slice(0, -1));
		} else {
			setBgs([]);
		}
	}

	function handleTouchEnd() {
		points = [];
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		setBgs(bgs.concat(canvas.toDataURL()));
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	return (
		<>
			<h1 className='gameTitle'>Drawing</h1>
			<div ref={canvasContainer} className='canvasContainer'>
				<div className='canvasBG'></div>
				{bgs.map((bg, i) => (
					<img key={i} className='canvasFrame' src={bg} alt='bg' />
				))}
				<canvas
					onTouchMove={drawLine}
					onTouchStart={drawLine}
					onTouchEnd={() => handleTouchEnd()}
					ref={canvasRef}
					id='drawingCanvas'></canvas>
			</div>
			<div className='penSettings'>
				<div className='backContainer'>
					<img onClick={back} id='retry' src={backspace} alt='' />
					<small>Undo</small>
				</div>
				<div className='penColor'>
					<input
						value={penColor}
						onChange={(e) => setPenColor(e.target.value)}
						type='color'
						name='penColor'
						id='penColor'
					/>
					<small>Color</small>
				</div>
				<div className='penSize'>
					<div className='psContainer'>
						<input
							value={penWidth}
							onChange={(e) => setPenWidth(e.target.value)}
							min={4}
							max={40}
							type='range'
							name='penWidth'
							id='penWidth'
						/>
					</div>
					<small>Size: {penWidth} px</small>
				</div>
			</div>
			<div className='drawer'>
				{players.length && (
					<p style={{ margin: 0 }} className='bodyText'>
						<b>{players[turn].name}</b> is drawing!
					</p>
				)}
			</div>
			<div className='wordContainer'>
				<p className='drawWord'>"{currentWord}"</p>
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
