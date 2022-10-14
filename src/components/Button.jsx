import React from "react";

export default function Button({ text, classes, onClick }) {
	return (
		<>
			{onClick ? (
				<div onClick={onClick} className={`button ${classes}`}>
					<p className='buttonText'>{text}</p>
				</div>
			) : (
				<div className={`button ${classes}`}>
					<p className='buttonText'>{text}</p>
				</div>
			)}
		</>
	);
}
