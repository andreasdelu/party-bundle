import React from "react";
import "../styles/Player.css";
import placeholder from "../assets/playerPlaceholder.png";
import del from "../assets/delete.svg";

export default function Player({ id, name, image, removable, onClick }) {
	//Hver gang en spiller bliver vist, bliver denne funktion brugt
	if (!image) {
		image = placeholder;
	}

	return (
		<>
			{/* Fremviser player funktionen og giver brugeren mulighed for at slette en player */}
			<div id={id} className='playerCard'>
				<div className='playerImageContainer'>
					{removable && (
						<img
							onClick={() => onClick(id)}
							className='deletePlayer'
							src={del}
							alt='delete'
						/>
					)}
					{/* Fremviser navn og billede på player */}
					<div className='playerImageBackground'></div>
					<img className='playerImage' src={image} alt={name} />
				</div>
				<div className='playerName'>{name}</div>
			</div>
		</>
	);
}
