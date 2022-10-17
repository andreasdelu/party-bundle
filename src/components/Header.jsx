import React, { useRef, useState } from "react";
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
import Dialog from "./Dialog";

export default function Header({ onlySettings, showRules, ruleContent }) {
	const [settingsDialog, setSettingsDialog] = useState(false);
	const [statisticsDialog, setStatisticsDialog] = useState(false);
	const [rulesDialog, setRulesDialog] = useState(false);
	const [aboutDialog, setAboutDialog] = useState(false);

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
					<div onClick={() => setSettingsDialog(true)} className='menuButton'>
						<img src={gear} alt='gear' />
						Settings
					</div>
					<div onClick={() => setStatisticsDialog(true)} className='menuButton'>
						<img src={stats} alt='stats' />
						Statistics
					</div>
					{showRules ? (
						<div onClick={() => setRulesDialog(true)} className='menuButton'>
							<img src={rules} alt='rules' />
							Rules
						</div>
					) : (
						<div className='menuButton menuButtonDisabled'>
							<img src={rules} alt='rules' />
							Rules
						</div>
					)}
					<div onClick={() => setAboutDialog(true)} className='menuButton'>
						<img src={about} alt='about' />
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

			<Dialog
				id={"settingsDialog"}
				isOpen={settingsDialog}
				closeClick={() => setSettingsDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>Settings</h2>
					</div>
				}
			/>
			<Dialog
				id={"statisticsDialog"}
				isOpen={statisticsDialog}
				closeClick={() => setStatisticsDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>Statistics</h2>
					</div>
				}
			/>
			<Dialog
				id={"rulesDialog"}
				isOpen={rulesDialog}
				closeClick={() => setRulesDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>
							Rules: <br /> {ruleContent && ruleContent.title}
						</h2>
						{ruleContent && ruleContent.rule}
					</div>
				}
			/>
			<Dialog
				id={"aboutDialog"}
				isOpen={aboutDialog}
				closeClick={() => setAboutDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>About Us</h2>
					</div>
				}
			/>
		</>
	);
}
