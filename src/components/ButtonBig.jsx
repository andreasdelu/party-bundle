import React from "react";
import "../styles/buttons.css";

export default function ButtonBig({ extraStyle, image, text, small }) {
	/* Stor knap, med mulighed for at ændre størrelse på billede og dropshadow gennem props */
	/* Samt sætte andre værdier gennem props */
	return (
		<>
			<div className='buttonBig'>
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
