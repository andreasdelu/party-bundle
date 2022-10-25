import React from "react";
import "../styles/buttons.css";

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
