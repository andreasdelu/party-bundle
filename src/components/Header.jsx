import React, { useRef, useState } from "react";
import "../styles/Header.css";

import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import arrow from "../assets/arrow.svg";

import { Link, NavLink } from "react-router-dom";
import close from "../assets/close.svg";
import gear from "../assets/gear.svg";
import stats from "../assets/stats.svg";
import rules from "../assets/info.svg";
import about from "../assets/question.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import facebook from "../assets/facebook.svg";
import Dialog from "./Dialog";
import reward from "../assets/reward.svg";

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
	//Konverterer tid fra fra minutter
	function convertTime(minutes) {
		let hour = Math.floor(minutes / 60);
		let minute = Math.floor(minutes) % 60;
		return `${hour}h ${minute}m`;
	}

	const menuRef = useRef(null);

	if (onlySettings === undefined) {
		onlySettings = false;
	}

	//Håndterer back knap
	function goBack() {
		window.history.back();
	}

	//Åbner burgermenu
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
					/* Generel opsætning af headeren  */
					<>
						<img onClick={goBack} className='headerArrow' src={arrow} alt='' />
						<Link to={"/"}>
							<img className='headerLogo' src={logo} alt='' />
						</Link>
					</>
				)}
				{/* Åbning af burgermenu  */}
				<img onClick={openMenu} className='headerMenu' src={menu} alt='cog' />
			</header>
			<div ref={menuRef} id='menu'>
				<div className='menuContainer'>
					<img className='menuLogo' src={logo} alt='' />
					{/* Menupunkter med animation */}
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
						<NavLink
							to={"/rewards"}
							style={{ transitionDelay: "0.25s", textDecoration: "none" }}
							className='menuButton swipeIn'>
							<img src={reward} alt='rewards' />
							Rewards
						</NavLink>
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

			{/* Dialogboks som viser settings */}
			<Dialog
				id={"settingsDialog"}
				isOpen={settingsDialog}
				closeClick={() => setSettingsDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>Settings</h2>
						<div className='languageWrap'>
							<label htmlFor='languages'>Language:</label>
							<select id='languages'>
								<option value='EN'>EN</option>
								<option value='DE'>DE</option>
								<option value='DK'>DK</option>
								<option value='SE'>SE</option>
								<option value='NO'>NO</option>
								<option value='ES'>ES</option>
							</select>
						</div>
					</div>
				}
			/>

			{/* Dialogboks som viser statistics*/}
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

			{/* Dialogboks som viser regler*/}
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

			{/* Dialogboks som viser About */}
			<Dialog
				id={"aboutDialog"}
				isOpen={aboutDialog}
				closeClick={() => setAboutDialog(false)}
				dialogContent={
					<div className='dialogContainer'>
						<h2>About Us</h2>
						<p className='textBody'>
							We made <b>Party Bundle</b> to make sure you have all you need to
							kickstart your party! <br /> <br /> Whether you are pregaming with
							your best mates or you need to break the ice with a bunch of
							soon-to-be friends, we have the game for you!
						</p>
					</div>
				}
			/>
		</>
	);
}
