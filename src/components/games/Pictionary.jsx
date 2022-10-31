import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import "../../styles/Drawing.css";
import Player from "../Player";
import Dialog from "../Dialog";
import backspace from "../../assets/backspace.svg";

export default function Pictionary() {
	const canvasRef = useRef(null);
	const canvasContainer = useRef(null);
	const guessRef = useRef(null);

	const [turn, setTurn] = useState(0);
	const [players, setPlayers] = useState([]);
	const [guesser, setGuesser] = useState({});
	const [guessList, setGuessList] = useState([]);

	const [show, setShow] = useState(false);

	const [guessDialog, setGuessDialog] = useState(false);
	const [turnDialog, setTurnDialog] = useState(true);
	const [endDialog, setEndDialog] = useState(false);

	const [words, setWords] = useState([]);
	const [currentWord, setCurrentWord] = useState("Harsk");

	const defaultWidth = 6;
	const defaultColor = "#000000";
	const [penWidth, setPenWidth] = useState(defaultWidth);
	const [penColor, setPenColor] = useState(defaultColor);

	const [bgs, setBgs] = useState([]);

	//Setup af canvas og importerer spillerene
	useEffect(() => {
		function resizeCanvas() {
			if (window.innerWidth <= 400) {
				canvasRef.current.width = window.innerWidth - 40;
			} else {
				canvasRef.current.width = 360;
			}
			canvasRef.current.height = canvasRef.current.width;
		}
		resizeCanvas();

		window.addEventListener("resize", resizeCanvas, false);

		setPlayers(JSON.parse(sessionStorage.getItem("players")));

		//Fetcher alle orderene fra databasen
		async function fetchWords() {
			const url =
				"https://party-bundle-default-rtdb.europe-west1.firebasedatabase.app/pictionary/en.json";
			const res = await fetch(url);
			const data = await res.json();
			setWords(data);
		}

		fetchWords();

		return () => {
			window.removeEventListener("resize", resizeCanvas, false);
		};
	}, []);

	//Sætter et random ord som det nuværende ord der skal gættes, når siden loader
	useEffect(() => {
		let rnd = Math.floor(Math.random() * words.length);
		setCurrentWord(words[rnd]);
	}, [words]);

	useEffect(() => {}, [bgs]);

	//Sætter et random ord som det nuværende ord der skal gættes
	function setGuessWord() {
		let rnd = Math.floor(Math.random() * words.length);
		setCurrentWord(words[rnd]);
	}

	useEffect(() => {}, [guessList]);

	//Håndterer at skifte turen til næste spiller
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
		setGuessList([]);
		setBgs([]);
		setPenColor(defaultColor);
		setPenWidth(defaultWidth);
		setTurnDialog(true);
	}

	//Viser ordet der skal tegnes og skjuler det igen efter 1500ms
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

	//Håndterer at lade spillerne gætte hver i sær når tegningen er færdig
	async function drawingDone() {
		for (const player of players) {
			if (player !== players[turn]) {
				setGuesser(player);
				setGuessDialog(true);
				guessRef.current.focus();
				let guess = await playerGuess(player);
				setGuessList((guessList) => [...guessList, guess]);
			}
		}
		setGuessDialog(false);
		setEndDialog(true);
	}

	// Returner et promise med en spillers gæt
	function playerGuess(player) {
		return new Promise((resolve, reject) => {
			document.getElementById("wordGuess").onsubmit = (e) => {
				e.preventDefault();
				resolve({ player: player, guess: e.target.guess.value });
				e.target.guess.value = "";
				e.target.guess.readOnly = true;
			};
		});
	}

	let points = [];

	//Tegner alle punkter gemt i points-arrayet på canvasset
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

	//Skubber et punkt til points-arrayet, med tilhørende data, og loader canvas
	function drawLine(e) {
		if (canDrawMobile) {
			const canvas = canvasRef.current.getBoundingClientRect();
			const x = e.targetTouches[0].clientX;
			const y = e.targetTouches[0].clientY;

			points.push({
				x: Math.floor(x - canvas.left),
				y: Math.floor(y - canvas.top),
				w: penWidth,
				col: penColor,
			});

			requestAnimationFrame(canvasLoad);
		}
		if (canDrawMouse) {
			const canvas = canvasRef.current.getBoundingClientRect();
			const x = e.clientX;
			const y = e.clientY;

			points.push({
				x: Math.floor(x - canvas.left),
				y: Math.floor(y - canvas.top),
				w: penWidth,
				col: penColor,
			});

			requestAnimationFrame(canvasLoad);
		}
	}

	//Sletter et billede fra bgs-arrayet
	function back() {
		if (bgs.length > 1) {
			setBgs(bgs.slice(0, -1));
		} else {
			setBgs([]);
		}
	}

	//Når brugeren stopper med at tegne gemmes billedet på canvasset i bgs-arrayet
	//Dette gøres for at øge performance
	function handleTouchEnd() {
		points = [];
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		setBgs(bgs.concat(canvas.toDataURL()));
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canDrawMouse = false;
		canDrawMobile = false;
	}

	//Viser den lille indikator over pen-størrelse slideren
	function PenSizeIndicator({ size, color }) {
		return (
			<div
				style={{
					width: size + "px",
					height: size + "px",
					backgroundColor: color,
				}}
				className='indicator'></div>
		);
	}

	//Viser om spilleren har gættet rigtigt, med mulighed for at stave en lille smule forkert
	function Guess({ guess }) {
		let word = guess.guess.toLowerCase().replace(/\s/g, "");

		return currentWord.toLowerCase().replace(/\s/g, "") === word ? (
			<p className='guess guessCorrect'>
				<b>{guess.player.name}:</b> <p className='theWord'>'{word}'</p>
			</p>
		) : (
			<p className='guess guessFalse'>
				<b>{guess.player.name}:</b> <p className='theWord'>'{word}'</p>
			</p>
		);
	}

	let canDrawMouse = false;
	let canDrawMobile = false;

	return (
		<>
			<h1 style={{ margin: 0 }} className='gameTitle'>
				Pictionary
			</h1>
			{/* Viser navnet på den spiller der tegner */}
			<div className='drawer'>
				{players.length && (
					<p style={{ margin: 0 }} className='bodyText'>
						<b>{players[turn].name}</b> is drawing!
					</p>
				)}
			</div>
			{/* Canvas elementet samt alle "baggrundende" */}
			<div ref={canvasContainer} className='canvasContainer'>
				<div className='canvasBG'></div>
				{bgs.map((bg, i) => (
					<img key={i} className='canvasFrame' src={bg} alt='bg' />
				))}
				<canvas
					onTouchMove={drawLine}
					onTouchStart={(e) => {
						canDrawMobile = true;
						drawLine(e);
					}}
					onTouchEnd={() => handleTouchEnd()}
					onMouseDown={(e) => {
						canDrawMouse = true;
						drawLine(e);
					}}
					onMouseMove={(e) => {
						drawLine(e);
					}}
					onMouseUp={handleTouchEnd}
					ref={canvasRef}
					id='drawingCanvas'></canvas>
			</div>
			{/* Indstillingerne for tegneredskabet */}
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
					<div style={{ display: "none" }} className='indicatorWrap'>
						<div className='indicatorBG'></div>
						<PenSizeIndicator color={penColor} size={penWidth} />
					</div>
					<div className='psContainer'>
						<input
							value={penWidth}
							onChange={(e) => setPenWidth(e.target.value)}
							onMouseDown={() =>
								(document.querySelector(".indicatorWrap").style.display =
									"grid")
							}
							onMouseUp={() =>
								(document.querySelector(".indicatorWrap").style.display =
									"none")
							}
							onTouchStart={() =>
								(document.querySelector(".indicatorWrap").style.display =
									"grid")
							}
							onTouchEnd={() =>
								(document.querySelector(".indicatorWrap").style.display =
									"none")
							}
							min={4}
							max={40}
							type='range'
							name='penWidth'
							id='penWidth'
						/>
					</div>
					<small>Size</small>
				</div>
			</div>
			{/* Container til knapperne "show word" og "done" */}
			<div className='pictionaryFooter'>
				<div className='wordContainer'>
					<p className='drawWord'>"{currentWord}"</p>
					{!show && (
						<div onClick={showWord} className='wordHide'>
							Show Word
						</div>
					)}
				</div>

				<Button
					classes={bgs.length ? "" : "buttonDisabled"}
					onClick={drawingDone}
					text={"Done"}
				/>
			</div>

			{/* Dialogboks til at håndtere spillerens gæt */}
			<Dialog
				id={"guessDialog"}
				isOpen={guessDialog}
				dialogContent={
					<div className='dialogContainer'>
						<h2>{guesser && guesser.name} is guessing</h2>
						<div className='guessImageWrap'>
							{bgs &&
								bgs.map((bg, i) => (
									<img key={i} className='guessImage' src={bg} alt='guess' />
								))}
						</div>
						<form id='wordGuess'>
							<input type='hidden' />
							<label style={{ marginTop: 10 }} htmlFor='inputGuess'>
								Your guess:
							</label>
							<input
								ref={guessRef}
								type='text'
								name='guess'
								id='inputGuess'
								placeholder='Word'
								autoComplete='off'
								required
								readOnly
								onClick={() => (guessRef.current.readOnly = false)}
							/>
							<button type='submit' className='dialogBtn'>
								<Button classes={"fitWidth"} text={"Guess"} />
							</button>
						</form>
					</div>
				}
			/>
			{/* Dialogboks der viser hvilke spillere der gættede rigtigt */}
			<Dialog
				id={"endDialog"}
				isOpen={endDialog}
				dialogContent={
					<div className='dialogContainer'>
						<h2>Round over</h2>
						<p className='correctWord textBody'>
							Correct word: <br />
							<b>'{currentWord}'</b>
						</p>
						{guessList &&
							guessList.map((guess, i) => <Guess key={i} guess={guess} />)}
						<Button
							onClick={() => {
								nextTurn();
								setEndDialog(false);
							}}
							text={"Next round"}
						/>
					</div>
				}
			/>
			{/* Dialogboks der viser hvis tur det er til at tegne */}
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
