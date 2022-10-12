import React from "react";

export default function Button({ text, classes }) {
	return (
		<>
			<div className={`button ${classes}`}>
				<p className='buttonText'>{text}</p>
			</div>
		</>
	);
}
