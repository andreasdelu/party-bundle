import React from "react";
import "../styles/buttons.css";
import bg from "../assets/partybg.png";

export default function ButtonLong({ extraStyle, image, text }) {
	return (
		<>
			<div className='buttonLong'>
				<div
					className='buttonLongBg'
					style={{ backgroundImage: `url(${bg})` }}></div>
				{extraStyle ? (
					<img
						style={{
							height: extraStyle.size,
							filter: `drop-shadow(0 0 3px rgba(0, 0, 0, ${extraStyle.dropOpacity}))`,
							marginTop: 5,
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
