import React, { useState, useRef } from "react";
import "../styles/AddPlayers.css";
import plus from "../assets/plus.svg";
import close from "../assets/close.svg";
import camera from "../assets/camera.svg";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Player from "../components/Player";

export default function AddPlayers() {
	const [userImage, setUserImage] = useState("");
	const [userList, setUserList] = useState(
		JSON.parse(sessionStorage.getItem("players"))
	);
	const inputRef = useRef(null);
	const formRef = useRef(null);

	const { game } = useParams();

	function dialogImage(e) {
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.readAsDataURL(file);
		reader.onload = () => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = 200;
			canvas.height = 200;

			let img = new Image();
			img.onload = function () {
				let ratio;
				if (this.width > this.height) {
					ratio = this.width / this.height;
					canvas.height = canvas.width / ratio;
				} else {
					ratio = this.height / this.width;
					canvas.width = canvas.height / ratio;
				}
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				setUserImage(canvas.toDataURL(file.type));
			};
			img.src = reader.result;
		};
	}

	function addPlayer(e) {
		e.preventDefault();
		if (inputRef.current.value.length > 11) {
			inputRef.current.value = inputRef.current.value.substring(0, 11);
		}
		let user = {
			id: Date.now(),
			name: inputRef.current.value,
			image: userImage,
		};
		let newList = [...userList, user];
		setUserList(newList);
		sessionStorage.setItem("players", JSON.stringify(newList));

		formRef.current.reset();
		setUserImage("");
		document.getElementById("addPlayer").close();
		const pCont = document.querySelector(".playerContainer");
		pCont.scrollTop = pCont.scrollHeight;
	}

	function removePlayer(id) {
		let newList = userList.filter((user) => user.id !== id);
		sessionStorage.setItem("players", JSON.stringify(newList));
		setUserList(newList);
	}

	function openDialog() {
		const dialog = document.getElementById("addPlayer");
		dialog.showModal();
		dialog.addEventListener("click", function (event) {
			let closeBtn = dialog.querySelector(".dialogClose");
			let rect = dialog.getBoundingClientRect();
			let isInDialog =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width;
			if (!isInDialog || event.target === closeBtn) {
				dialog.close();
				document.getElementById("addForm").reset();
				setUserImage("");
			}
		});
	}

	return (
		<>
			<Header />
			<div className='addPlayersWrap'>
				<p className='bodyText'>Add players:</p>
				<div className='playerContainer'>
					{userList.map((user) => (
						<Player
							removable={true}
							onClick={removePlayer}
							key={user.id}
							id={user.id}
							name={user.name}
							image={user.image}
						/>
					))}
				</div>
				{userList.length <= 9 ? (
					<button type='button' onClick={openDialog} className='addButton'>
						<img src={plus} alt='plus' />
					</button>
				) : (
					<p className='textBody'>Max players reached</p>
				)}
				{userList.length ? (
					<Link className='buttonLink' to={`/game/${game}/difficulty/`}>
						<Button classes={"buttonFixed"} text={"Next"} />
					</Link>
				) : (
					<Button classes={"buttonFixed buttonDisabled"} text={"Next"} />
				)}
			</div>
			<dialog id='addPlayer'>
				<div className='dialogContainer'>
					<img className='dialogClose' src={close} alt='' />
					<h2>Add Player:</h2>
					<form ref={formRef} id='addForm' onSubmit={addPlayer}>
						<label htmlFor='playerName'>Enter player name:</label>
						<input
							ref={inputRef}
							name='name'
							type='text'
							placeholder='Name'
							id='playerName'
							maxLength={11}
							autoComplete='off'
							required
						/>
						<small>(Max 11 characters)</small>
						<label htmlFor='uploadPhoto'>Add a picture:</label>
						<div className='uploadPhotoContainer'>
							<input
								onChange={dialogImage}
								name='image'
								type='file'
								capture='user'
								id='uploadPhoto'
								accept='image/*'
							/>
							<img className='uploadCamera' src={camera} alt='camera' />
							<img className='camPlus' src={plus} alt='plus' />
							{userImage && (
								<img src={userImage} alt='preview' id='imagePreview' />
							)}
						</div>
						<button onClick={addPlayer} type='button' className='dialogBtn'>
							<Button classes={"fitWidth"} text={"Add"} />
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
}
