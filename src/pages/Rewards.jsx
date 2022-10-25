import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import "../styles/Games.css";
import "../styles/Rewards.css";
import ButtonBig from "../components/ButtonBig";
import ButtonReward from "../components/ButtonReward";
import { Link } from "react-router-dom";
import Dialog from "../components/Dialog";
import qr from "../assets/qr.png";

export default function Rewards() {
	const [rewards, setRewards] = useState([]);
	const [rewardDialog, setRewardDialog] = useState(false);
	const [rewardName, setRewardName] = useState("");
	const [rewardSponsor, setRewardSponsor] = useState("");

	useEffect(() => {
		if (localStorage.getItem("rewards")) {
			setRewards(JSON.parse(localStorage.getItem("rewards")));
		}
	}, []);

	function openDialog(name, sponsor) {
		setRewardName(name);
		setRewardSponsor(sponsor);
		setRewardDialog(true);
	}

	return (
		<>
			<Header />
			<div className='gameContainer'>
				<h1 className='gameTitle'>Rewards</h1>
				<div className='rewardButtons'>
					{rewards &&
						rewards.map((reward, i) => (
							<ButtonReward
								onClick={() => openDialog(reward.reward, reward.sponsor)}
								key={i}
								color={reward.color}
								icon={reward.icon}
								prize={reward.reward}
								sponsor={reward.sponsor}
								time={reward.time}
							/>
						))}
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
			<Dialog
				id={"rewardDialog"}
				isOpen={rewardDialog}
				closeClick={() => setRewardDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>{rewardName}</h2>
						<small>{rewardSponsor}</small>
						<img className='qr' src={qr} alt='qr' />
					</div>
				}
			/>
		</>
	);
}
