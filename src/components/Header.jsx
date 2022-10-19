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
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import Dialog from "./Dialog";

export default function Header({ onlySettings, showRules, ruleContent }) {
	const [settingsDialog, setSettingsDialog] = useState(false);
	const [statisticsDialog, setStatisticsDialog] = useState(false);
	const [rulesDialog, setRulesDialog] = useState(false);
	const [aboutDialog, setAboutDialog] = useState(false);

	const [statsLocal, setStatsLocal] = useState(
		JSON.parse(localStorage.getItem("stats"))
	);
	const [statsSession, setStatsSession] = useState(
		JSON.parse(sessionStorage.getItem("stats"))
	);

	function convertTime(minutes) {
		let hour = Math.floor(minutes / 60);
		let minute = Math.floor(minutes) % 60;
		return `${hour}h ${minute}m`;
	}

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
				<img onClick={openMenu} className='headerMenu' src={menu} alt='cog' />
			</header>
			<div ref={menuRef} id='menu'>
				<div className='menuContainer'>
					<img className='menuLogo' src={logo} alt='' />
					<div className='menuButtons'>
						<div
							style={{ transitionDelay: "0.1s" }}
							onClick={() => setSettingsDialog(true)}
							className='menuButton swipeIn'>
							<img src={gear} alt='gear' />
							Settings
						</div>
						<div
							style={{ transitionDelay: "0.2s" }}
							onClick={() => {
								setStatisticsDialog(true);
								setStatsLocal(JSON.parse(localStorage.getItem("stats")));
								setStatsSession(JSON.parse(sessionStorage.getItem("stats")));
							}}
							className='menuButton swipeIn'>
							<img src={stats} alt='stats' />
							Statistics
						</div>
						{showRules ? (
							<div
								style={{ transitionDelay: "0.3s" }}
								onClick={() => setRulesDialog(true)}
								className='menuButton swipeIn'>
								<img src={rules} alt='rules' />
								Rules
							</div>
						) : (
							<div
								style={{ transitionDelay: "0.3s" }}
								className='menuButton swipeIn menuButtonDisabled'>
								<img src={rules} alt='rules' />
								Rules
							</div>
						)}
						<div
							style={{ transitionDelay: "0.4s" }}
							onClick={() => setAboutDialog(true)}
							className='menuButton swipeIn'>
							<img src={about} alt='about' />
							About
						</div>
					</div>
					<div
						className='menuFooter swipeIn'
						style={{ transitionDelay: "0.5s" }}>
						<h3>Follow us!</h3>
						<div className='someWrap'>
							<img className='someIcon' src={facebook} alt='facebook' />
							<img className='someIcon' src={instagram} alt='instagram' />
							<img className='someIcon' src={twitter} alt='twitter' />
						</div>
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
						<div className='statsTime'>
							<h3 className='statsH3'>Time played:</h3>
							<div className='timeSpent'>
								<p>
									Session:
									<br />
									<small>{convertTime(statsSession.timePlayed.minutes)}</small>
								</p>
								<p>
									All-time:
									<br />
									<small>{convertTime(statsLocal.timePlayed.minutes)}</small>
								</p>
							</div>
						</div>
						<div className='statsHiScore'>
							<h3 className='statsH3'>Highscores:</h3>
							<div className='hiScore'>
								{statsLocal.hiscores &&
									Object.keys(statsLocal.hiscores).map((key, i) => (
										<p key={i}>
											<b>{statsLocal.hiscores[key].name}:</b>{" "}
											{statsLocal.hiscores[key].value}{" "}
											{statsLocal.hiscores[key].valueName}
										</p>
									))}
								{!statsLocal.hiscores && <p>No highscores to show...</p>}
							</div>
						</div>
						<p></p>
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
