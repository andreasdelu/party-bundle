import React, { useEffect, useRef, useState } from "react";
import "../../styles/Games.css";
import "../../styles/spinThebottle.css";
import Button from "../Button";
import Player from "../Player";
import bottle from "../../assets/bottle.svg";

export default function SpinTheBottle({ diff }) {
	const [players] = useState(JSON.parse(sessionStorage.getItem("players")));
	const [chosenPlayer, setchosenPlayer] = useState(null);
	const [spins, setSpins] = useState(3);
	const [prevDegree, setPrevDegree] = useState(0);
	const bottleRef = useRef(null);
	const bottleRotations = [];
	players.forEach((p, i) => {
		let degree = Math.floor(360 / players.length) * i;
		bottleRotations.push(degree);
	});
	const [truths, setTruths] = useState([]);
	const [dares, setDares] = useState([]);
	const [currentPrompt, setCurrentPrompt] = useState("");
	let usedTruths = [];
	let usedDares = [];

	useEffect(() => {
		async function fetchQuestions() {
			const url =
				"https://party-bundle-default-rtdb.europe-west1.firebasedatabase.app/spinbottle/en.json";
			const res = await fetch(url);
			const data = await res.json();

			setTruths(data.truth);
			setDares(data.dare);
		}

		fetchQuestions();
	}, []);
	useEffect(() => {
		usedTruths = truths;
		usedDares = dares;
	}, [truths, dares]);

	function spin() {
		setchosenPlayer(null);
		setCurrentPrompt("");
		const playerList = document.querySelectorAll(".spinPlayerContainer");
		playerList.forEach((player) => {
			player.style.filter = "";
		});
		setSpins(spins + 3);
		const bottle = bottleRef.current;
		let degree =
			bottleRotations[Math.floor(Math.random() * bottleRotations.length)];
		if (degree === prevDegree) {
			let altRotations = bottleRotations.filter((rot) => degree !== rot);
			degree =
				altRotations[Math.floor(Math.random() * bottleRotations.length - 1)];
		}
		const spinTo = 360 * spins + degree + "deg";
		bottle.ontransitionend = () => {
			const playerContainer = document.getElementById(`${degree}`);
			playerContainer.style.filter = "drop-shadow(0 0 5px #0b27ff81)";
			const player = players.filter(
				(p) => p.id === parseInt(playerContainer.dataset.playerid)
			);
			setchosenPlayer(...player);
		};
		bottle.style.transform = `rotate(${spinTo})`;
		setPrevDegree(degree);
	}

	function showTruth() {
		if (!usedTruths.length) {
			usedTruths = truths;
		}
		const rnd = Math.floor(Math.random() * usedTruths.length);
		const q = usedTruths[rnd];
		usedTruths = usedTruths.filter((question, i) => i !== rnd);
		setCurrentPrompt(q);
	}

	function showDare() {
		if (!usedDares.length) {
			usedDares = dares;
		}
		const rnd = Math.floor(Math.random() * usedDares.length);
		const q = usedDares[rnd];
		usedDares = usedDares.filter((question, i) => i !== rnd);
		setCurrentPrompt(q);
	}

	return (
		<>
			<div className='gameContainer'>
				<h1 className='gameTitle'>Spin the bottle</h1>
				<div className='bottleGame'>
					<div className='playerCircle'>
						{players.map((player, index) => (
							<div
								data-playerid={player.id}
								id={`${Math.floor(360 / players.length) * index}`}
								key={index}
								style={{
									transform: `rotate(${Math.floor(
										(360 / players.length) * index
									)}deg)`,
								}}
								className='spinPlayerContainer'>
								<div
									style={{
										transform: `rotate(-${Math.floor(
											(360 / players.length) * index
										)}deg) scale(${players.length >= 7 ? "0.75" : "0.9"})`,
									}}
									className='smallRotate'>
									<Player
										id={player.id}
										name={player.name}
										image={player.image}
									/>
								</div>
							</div>
						))}
						<img
							ref={bottleRef}
							onClick={spin}
							className='bottle'
							src={bottle}
							alt='bottle'
						/>
					</div>
					{chosenPlayer && (
						<div className='promptWrap'>
							<h2>You're up {chosenPlayer.name}!</h2>
							{currentPrompt ? (
								<>
									<p>{currentPrompt}</p>
									<p>
										Penalty:{" "}
										<b>
											{Math.floor(Math.random() * 4) + 1 + parseInt(diff)} sips
										</b>
									</p>
								</>
							) : (
								<div className='spinButtons'>
									<Button onClick={showTruth} text={"Truth"} />
									<Button onClick={showDare} text={"Dare"} />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
