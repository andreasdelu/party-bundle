import React from "react";

export default function Button({ text }) {
	return (
		<>
			<div className='button'>
				<p className='buttonText'>{text}</p>
			</div>
		</>
	);
}
