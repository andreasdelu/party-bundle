import React, { useEffect, useState } from "react";
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
	const [userList, setUserList] = useState([]);

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
		let user = {
			id: Date.now(),
			name: e.target.name.value,
			image: userImage,
		};
		let newList = [...userList, user];
		setUserList(newList);
		sessionStorage.setItem("players", JSON.stringify(newList));
		document.getElementById("addPlayer").close();

		e.target.reset();
		setUserImage("");
	}

	function removePlayer(id) {
		let newList = userList.filter((user) => user.id !== id);
		sessionStorage.setItem("players", JSON.stringify(newList));
		setUserList(newList);
	}

	useEffect(() => {
		if (sessionStorage.getItem("players")) {
			setUserList(JSON.parse(sessionStorage.getItem("players")));
		}
	}, []);

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
				<button type='button' onClick={openDialog} className='addButton'>
					<img src={plus} alt='plus' />
				</button>
			</div>
			{userList.length ? (
				<Link className='buttonLink' to={`/game/${game}/difficulty/`}>
					<Button classes={"buttonFixed"} text={"Next"} />
				</Link>
			) : (
				<Button classes={"buttonFixed buttonDisabled"} text={"Next"} />
			)}
			<dialog id='addPlayer'>
				<div className='dialogContainer'>
					<img className='dialogClose' src={close} alt='' />
					<h2>Add Player:</h2>
					<form id='addForm' onSubmit={addPlayer}>
						<label htmlFor='playerName'>Enter player name:</label>
						<input
							name='name'
							type='text'
							placeholder='Name'
							id='playerName'
							maxLength={12}
							autoComplete='off'
							required
						/>
						<small>(Max 12 characters)</small>
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
						<button type='submit' className='dialogBtn'>
							<Button classes={"fitWidth"} text={"Add"} />
						</button>
					</form>
				</div>
			</dialog>
		</>
	);
}
