import React from "react";
import "../styles/buttons.css";

export default function ButtonBig({ image, text, size }) {
	return (
		<>
			<div className='buttonBig'>
				<img
					style={{ width: size }}
					className='buttonImage'
					src={image}
					alt=''
				/>
				<p className='buttonText'>{text}</p>
			</div>
		</>
	);
}
