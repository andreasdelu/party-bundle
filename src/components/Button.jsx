import React from "react";
import "../styles/buttons.css";

export default function Button({ text, classes, onClick }) {
	return (
		<>
			{/* Lille knap component til de forskellige spil, med parametre til at indikere text, class og onClick */}
			{onClick ? (
				<div onClick={onClick} className={`button ${classes}`}>
					<p className='buttonText'>{text}</p>
				</div>
			) : (
				/* Ternary hvis der ikke bliver brugt onClick på en knap  */
				<div className={`button ${classes}`}>
					<p className='buttonText'>{text}</p>
				</div>
			)}
		</>
	);
}
