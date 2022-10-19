import React, { useRef, useState } from "react";
import "../../styles/ReactionGame.css";
import Button from "../Button";
import { saveStats } from "../../modules/Save";

export default function ReactionGame({ diff }) {
	const boxRef = useRef(null);
	const contRef = useRef(null);
	const diaRef = useRef(null);
	const [start, setStart] = useState(false);
	const [createdTime, setCreatedTime] = useState(0);

	function getRandomColor() {
		let letters = "0123456789ABCDEF".split("");
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}

	let clickedTime;
	let reactionTime;

	function makeBox() {
		let time = Math.random();
		time = time * 4000 + 1000;

		setTimeout(function () {
			let size = 50;
			size += Math.floor(Math.random() * 100);
			boxRef.current.style.borderRadius = "50%";
			boxRef.current.style.width = size + "px";
			boxRef.current.style.height = size + "px";

			let top = Math.random();
			top = top * (contRef.current.offsetHeight - size);
			let left = Math.random();
			left = left * (contRef.current.offsetWidth - size);

			boxRef.current.style.top = top + "px";
			boxRef.current.style.left = left + "px";

			boxRef.current.style.backgroundColor = getRandomColor();

			boxRef.current.style.display = "block";

			setCreatedTime(Date.now());
		}, time);
	}

	function handleClickBox(e) {
		clickedTime = Date.now();

		reactionTime = (clickedTime - createdTime) / 1000;

		document.getElementById("printReactionTime").innerHTML =
			"Your Reaction Time is: " + reactionTime + " seconds";

		boxRef.current.style.display = "none";

		saveStats("reaction", {
			name: "Reaction time",
			value: reactionTime,
			valueName: "seconds",
		});

		diaRef.current.showModal();
	}

	function handleClickDiaBtn(e) {
		makeBox();
		diaRef.current.close();
	}

	function handleClickBtn(e) {
		makeBox();
		setStart(true);
	}
	return (
		<>
			<h1 className='gameTitle'>Speed Test</h1>
			{!start && (
				<Button
					classes={"centerAbsolute"}
					onClick={handleClickBtn}
					text={"Start Game"}
				/>
			)}

			<dialog ref={diaRef}>
				<h1 id='overskrift'>You're fast!</h1>
				<p id='printReactionTime'></p>
				<div id='container-reaction'>
					<Button onClick={handleClickDiaBtn} text={"Try again"} />
				</div>
			</dialog>
			<div ref={contRef} className='reactionContainer'>
				<div ref={boxRef} onClick={handleClickBox} id='box'></div>
			</div>
		</>
	);
}
