import React from "react";
import "../styles/Player.css";
import placeholder from "../assets/playerPlaceholder.png";

export default function Player({ id, name, image }) {
	if (!image) {
		image = placeholder;
	}

	return (
		<>
			<div data-id={id} className='playerCard'>
				<div className='playerImageContainer'>
					<div className='playerImageBackground'></div>
					<img className='playerImage' src={image} alt={name} />
				</div>
				<div className='playerName'>{name}</div>
			</div>
		</>
	);
}
