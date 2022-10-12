import React from "react";
import "../styles/Player.css";
import placeholder from "../assets/playerPlaceholder.png";
import del from "../assets/delete.svg";

export default function Player({ id, name, image, removable, onClick }) {
	if (!image) {
		image = placeholder;
	}

	return (
		<>
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
					<div className='playerImageBackground'></div>
					<img className='playerImage' src={image} alt={name} />
				</div>
				<div className='playerName'>{name}</div>
			</div>
		</>
	);
}
