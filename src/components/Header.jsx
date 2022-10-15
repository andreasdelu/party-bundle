import React, { useRef } from "react";
import "../styles/Header.css";

import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import arrow from "../assets/arrow.svg";

import { Link } from "react-router-dom";
import close from "../assets/close.svg";
import gear from "../assets/gear.svg";
import stats from "../assets/stats.svg";
import rules from "../assets/info.svg";
import about from "../assets/question.svg";

export default function Header({ onlySettings }) {
	const menuRef = useRef(null);

	if (onlySettings === undefined) {
		onlySettings = false;
	}

	function goBack() {
		window.history.back();
	}

	function openMenu() {
		const menu = menuRef.current;
		menu.classList.add("menuShow");
	}
	function closeMenu() {
		const menu = menuRef.current;
		menu.classList.remove("menuShow");
	}

	return (
		<>
			<header id='header'>
				{!onlySettings && (
					<>
						<img onClick={goBack} className='headerArrow' src={arrow} alt='' />
						<Link to={"/"}>
							<img className='headerLogo' src={logo} alt='' />
						</Link>
					</>
				)}
				<img onClick={openMenu} className='headerGear' src={menu} alt='cog' />
			</header>
			<div ref={menuRef} id='menu'>
				<div onClick={closeMenu} className='menuBG'></div>
				<div className='menuContainer'>
					<div className='menuButton'>
						<img src={gear} alt='gear' />
						Settings
					</div>
					<div className='menuButton'>
						<img src={stats} alt='gear' />
						Statistics
					</div>
					<div className='menuButton'>
						<img src={rules} alt='gear' />
						Rules
					</div>
					<div className='menuButton'>
						<img src={about} alt='gear' />
						About
					</div>
				</div>
				<img
					onClick={closeMenu}
					className='menuClose'
					src={close}
					alt='close'
				/>
			</div>
		</>
	);
}
