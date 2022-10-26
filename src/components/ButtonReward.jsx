import React from "react";
import "../styles/buttons.css";
import clock from "../assets/clock.svg";

export default function ButtonReward({
	onClick,
	color,
	icon,
	prize,
	sponsor,
	time,
}) {
	//Knap til at vise rewards som brugeren har opnået
	time = time + 7 * 24 * 60 * 60 * 1000 - Date.now();

	return (
		<>
			<div onClick={onClick} className='buttonReward'>
				<div
					style={{ backgroundColor: `${color}` }}
					className='buttonRewardBg'></div>
				<img src={icon} alt='icon' />
				<div className='rewardTextWrap'>
					<p className='rewardPrize'>{prize}</p>
					<p className='rewardSponsor'>{sponsor}</p>
				</div>
				<p className='rewardExpire'>
					<img src={clock} alt='' />
					{Math.floor(time / 1000 / 60 / 60 / 24)} Days
				</p>
			</div>
		</>
	);
}
