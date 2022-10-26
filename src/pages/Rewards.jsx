import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import "../styles/Games.css";
import "../styles/Rewards.css";
import ButtonReward from "../components/ButtonReward";
import { Link } from "react-router-dom";
import Dialog from "../components/Dialog";
import qr from "../assets/qr.png";

export default function Rewards() {
	const [rewards, setRewards] = useState([]);
	const [rewardDialog, setRewardDialog] = useState(false);
	const [rewardName, setRewardName] = useState("");
	const [rewardSponsor, setRewardSponsor] = useState("");
	const [rewardExpires, setRewardExpires] = useState("");

	//Checker om der er "rewards findes i localStorage og sætter rewards til denne værdi"
	useEffect(() => {
		if (localStorage.getItem("rewards")) {
			setRewards(JSON.parse(localStorage.getItem("rewards")));
		}
	}, []);

	//Håndterer Dialogens åbning og ændrer data så det passer til linket der blev klikket på
	function openDialog(name, sponsor, time) {
		setRewardName(name);
		setRewardSponsor(sponsor);
		time = time + 7 * 24 * 60 * 60 * 1000;
		let date = new Date(time).toLocaleString();
		setRewardExpires(date);
		setRewardDialog(true);
	}

	return (
		<>
			<Header />
			{/* Container til alle reward-knapperne */}
			<div className='gameContainer'>
				<h1 className='gameTitle'>Rewards</h1>
				<div className='rewardButtons'>
					{rewards &&
						rewards.map((reward, i) => (
							<ButtonReward
								onClick={() =>
									openDialog(reward.reward, reward.sponsor, reward.time)
								}
								key={i}
								color={reward.color}
								icon={reward.icon}
								prize={reward.reward}
								sponsor={reward.sponsor}
								time={reward.time}
							/>
						))}
					{/* Hvis der ikke er nogle rewards vises der en tekst */}
					{!rewards.length && (
						<>
							<p style={{ margin: 0 }} className='textBody'>
								You have no rewards...
							</p>
							<p style={{ margin: 0 }} className='textBody'>
								Go to <b>Spin N' Win</b> and try you luck on the wheel:
							</p>
							<Link className='buttonLink' to={"/spinwin"}>
								<Button text={"Spin N' Win"} />
							</Link>
						</>
					)}
				</div>
			</div>
			{/* Dialog til at vise QR kode */}
			<Dialog
				id={"rewardDialog"}
				isOpen={rewardDialog}
				closeClick={() => setRewardDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>{rewardName}</h2>
						<small>{rewardSponsor}</small>
						<img className='qr' src={qr} alt='qr' />
						<small style={{ margin: 0 }}>Expires:</small>
						<p style={{ margin: 0, padding: 0, fontSize: "1rem" }}>
							{rewardExpires}
						</p>
					</div>
				}
			/>
		</>
	);
}
