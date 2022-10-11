import React from "react";

export default function Player({ name, image }) {
	return (
		<>
			<div className='playerCard'>
				<img src={image} alt={name} />
				<div>{name}</div>
			</div>
		</>
	);
}
