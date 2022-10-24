import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";

import "../../styles/Games.css";
import "../../styles/SpinWin.css";
import noreward from "../../assets/wheel/noreward.svg";
import sponsor from "../../assets/guldhornene.webp";
import garderobe from "../../assets/wheel/garderobe.svg";
import drink from "../../assets/wheel/drink.svg";
import shots from "../../assets/wheel/shotswheel.svg";
import discount from "../../assets/wheel/discountcode.svg";
import hourglass from "../../assets/wheel/hourglass.svg";

export default function SpinWin() {
	const wheelRef = useRef(null);
	const [canSpin, setCanSpin] = useState(null);
	const [prize, setPrize] = useState("");
	const [dataTime, setDateTime] = useState(
		parseInt(localStorage.getItem("wheel"))
	);
	const [timeLeft, setTimeLeft] = useState("Calculating time...");

	const prizes = [
		{
			deg: 45,
			prize: "1 free wardrobe ticket!",
			col: "#ffb936",
			icon: garderobe,
			reward: "1 Wardrobe Ticket",
		},
		{
			deg: 90,
			prize: "Unlucky!",
			col: "#253c68",
			icon: noreward,
		},
		{
			deg: 135,
			prize: "1 Free Shot!",
			col: "#ff4864",
			icon: shots,
			reward: "1 Shot",
		},
		{
			deg: 180,
			prize: "Unlucky!",
			col: "#253c68",
			icon: noreward,
		},
		{
			deg: 225,
			prize: "Unlucky!",
			col: "#253c68",
			icon: noreward,
		},
		{
			deg: 270,
			prize: "1 Free Drink",
			col: "#1d7dff",
			icon: drink,
			reward: "1 Drink",
		},
		{
			deg: 315,
			prize: "Unlucky!",
			col: "#253c68",
			icon: noreward,
		},
		{
			deg: 360,
			prize: "1 Discount Code!",
			col: "#00ddbb",
			icon: discount,
			reward: "20% Discount",
		},
	];

	function calcTime() {
		const now = Date.now();
		const next = dataTime + 24 * 60 * 60 * 1000;
		const delta = next - now;
		const h = Math.floor((delta / 1000 / 60 / 60) % 24);
		const m = Math.floor((delta / 1000 / 60) % 60);
		const s = Math.floor((delta / 1000) % 60);
		setTimeLeft(`${h}h ${m}m ${s}s`);
	}

	useEffect(() => {
		if (localStorage.getItem("wheel")) {
			const next = dataTime + 24 * 60 * 60 * 1000;
			const now = Date.now();
			if (next > now) {
				setCanSpin(false);
				calcTime();
				const timeCalcInterval = setInterval(() => {
					const now = Date.now();
					const next = dataTime + 24 * 60 * 60 * 1000;
					calcTime();
					if (next <= now) {
						setCanSpin(true);
						clearInterval(timeCalcInterval);
					}
				}, 1000);

				return () => {
					clearInterval(timeCalcInterval);
				};
			} else {
				setCanSpin(true);
			}
		} else {
			setCanSpin(true);
		}
	}, []);

	/* Spins wheel and shows prize */

	function spinWheel() {
		const p = prizes[Math.floor(Math.random() * 8)];
		setPrize(p);
		const rot = p.deg;
		wheelRef.current.ontransitionend = () => {
			document.querySelector(".wheeloverlay").classList.add("showPrize");
		};
		wheelRef.current.style.transform = `rotate(-${rot + 1080}deg)`;
		localStorage.setItem("wheel", Date.now());
		if (p.reward) {
			if (localStorage.getItem("rewards")) {
				const rewards = JSON.parse(localStorage.getItem("rewards"));
				rewards.push(p.reward);
				localStorage.setItem("rewards", JSON.stringify(rewards));
			} else {
				localStorage.setItem("rewards", JSON.stringify([p.reward]));
			}
		}
	}

	return (
		<>
			<Header />
			<div className='gameContainer'>
				<h1 className='gameTitle'>Spin N' Win!</h1>
				<img id='sponsorLogo' src={sponsor} alt='sponsor' />
				{canSpin && (
					<>
						<div className='wheelWrap'>
							<div ref={wheelRef} className='wheelInner'>
								<div
									style={{
										zIndex: 1,
										backgroundColor: "#FFB936",
										transformOrigin: "left bottom",
										right: 0,
										left: "50%",
										transform: "rotate(0deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 1,
										backgroundColor: "#253C68",
										transformOrigin: "left bottom",
										right: 0,
										left: "50%",
										transform: "rotate(45deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 1,
										backgroundColor: "#FF4864",
										transformOrigin: "left bottom",
										right: 0,
										left: "50%",
										transform: "rotate(90deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 1,
										backgroundColor: "#253C68",
										transformOrigin: "left bottom",
										right: 0,
										left: "50%",
										transform: "rotate(135deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 3,
										backgroundColor: "#253C68",

										transform: "rotate(225deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 2,
										backgroundColor: "#1D7DFF",
										transform: "rotate(270deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 1,
										backgroundColor: "#253C68",
										transform: "rotate(315deg)",
									}}
									className='wheelSegment'></div>
								<div
									style={{
										zIndex: 0,
										backgroundColor: "#00DDBB",
										transform: "rotate(360deg)",
									}}
									className='wheelSegment'></div>

								<div className='lines'>
									<div
										style={{ transform: "rotate(0deg)" }}
										className='line'></div>
									<div
										style={{ transform: "rotate(45deg)" }}
										className='line'></div>
									<div
										style={{ transform: "rotate(90deg)" }}
										className='line'></div>
									<div
										style={{ transform: "rotate(135deg)" }}
										className='line'></div>
								</div>
								<div className='icons'>
									<div
										style={{ transform: "rotate(45deg)" }}
										className='iconWrap'>
										<img
											style={{ marginTop: 10 }}
											src={garderobe}
											alt='garderobe'
										/>
									</div>
									<div
										style={{ transform: "rotate(90deg)" }}
										className='iconWrap'>
										<img
											style={{ maxWidth: "50px", maxHeight: "50px" }}
											src={noreward}
											alt='noreward'
										/>
									</div>
									<div
										style={{ transform: "rotate(135deg)" }}
										className='iconWrap'>
										<img
											style={{ maxWidth: "50px", maxHeight: "50px" }}
											src={shots}
											alt='shots'
										/>
									</div>
									<div
										style={{ transform: "rotate(180deg)" }}
										className='iconWrap'>
										<img
											style={{ maxWidth: "50px", maxHeight: "50px" }}
											src={noreward}
											alt='noreward'
										/>
									</div>
									<div
										style={{ transform: "rotate(225deg)" }}
										className='iconWrap'>
										<img
											style={{ maxWidth: "50px", maxHeight: "50px" }}
											src={noreward}
											alt='noreward'
										/>
									</div>
									<div
										style={{ transform: "rotate(270deg)" }}
										className='iconWrap'>
										<img src={drink} alt='drink' />
									</div>
									<div
										style={{ transform: "rotate(315deg)" }}
										className='iconWrap'>
										<img
											style={{ maxWidth: "50px", maxHeight: "50px" }}
											src={noreward}
											alt='noreward'
										/>
									</div>
									<div
										style={{ transform: "rotate(360deg)" }}
										className='iconWrap'>
										<img src={discount} alt='discount' />
									</div>
								</div>
							</div>

							<button onClick={spinWheel} type='button' id='spinWheel'>
								Spin
								<div id='buttonMarker'></div>
							</button>
							<div
								style={
									prize
										? { backgroundColor: prize.col }
										: { backgroundColor: "red" }
								}
								className='wheeloverlay'>
								<img src={prize && prize.icon} alt='shots' />
								<h2>{prize && prize.prize}</h2>
								<p>Play again tomorrow!</p>
							</div>
						</div>
						<div className='prize'>
							<label>Spin the wheel to claim your daily prize</label>
							<label>Find your prizes under rewards</label>
						</div>
					</>
				)}
				{!canSpin && (
					<>
						<div id='noSpin'>
							<h2>No more spins today...</h2>
							<p className='textBody'>Come back tomorrow!</p>
							<p className='textBody'>{timeLeft}</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}
