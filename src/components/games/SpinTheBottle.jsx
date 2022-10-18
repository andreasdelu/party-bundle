import React, { useRef, useState } from "react";
import "../../styles/Games.css";
import "../../styles/spinThebottle.css";
import Button from "../Button";
import Player from "../Player";
import bottle from "../../assets/bottle.svg";

export default function SpinTheBottle() {
	const [players] = useState(JSON.parse(sessionStorage.getItem("players")));
	const [chosenPlayer, setchosenPlayer] = useState(null);
	const [spins, setSpins] = useState(3);
	const bottleRef = useRef(null);
	const bottleRotations = [];
	players.forEach((p, i) => {
		let degree = Math.floor(360 / players.length) * i;
		bottleRotations.push(degree);
	});

	function spin() {
		setchosenPlayer(null);
		const playerList = document.querySelectorAll(".spinPlayerContainer");
		playerList.forEach((player) => {
			player.style.filter = "";
		});
		setSpins(spins + 3);
		const bottle = bottleRef.current;
		const degree =
			bottleRotations[Math.floor(Math.random() * bottleRotations.length)];
		const spinTo = 360 * spins + degree + "deg";
		bottle.ontransitionend = () => {
			const playerContainer = document.getElementById(`${degree}`);
			playerContainer.style.filter = "drop-shadow(0 0 20px #0b27ff81)";
			const player = players.filter(
				(p) => p.id === parseInt(playerContainer.dataset.playerid)
			);
			setchosenPlayer(...player);
		};
		bottle.style.transform = `rotate(${spinTo})`;
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
								id={`${Math.floor((360 / players.length) * index)}`}
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
										)}deg) scale(0.9)`,
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

					<h2>{chosenPlayer && chosenPlayer.name}</h2>
				</div>
			</div>
		</>
	);
}
