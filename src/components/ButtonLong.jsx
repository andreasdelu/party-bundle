import React from "react";
import "../styles/buttons.css";

export default function ButtonLong({ extraStyle, image, text }) {
	return (
		<>
			<div className='buttonLong'>
				{extraStyle ? (
					<img
						style={{
							height: extraStyle.size,
							filter: `drop-shadow(0 0 3px rgba(0, 0, 0, ${extraStyle.dropOpacity}))`,
						}}
						className='buttonImage'
						src={image}
						alt=''
					/>
				) : (
					<img className='buttonImage' src={image} alt='' />
				)}
				<p className='buttonText'>{text}</p>
			</div>
		</>
	);
}
