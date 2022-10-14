import React from "react";
import "../styles/Header.css";

import logo from "../assets/logo.svg";
import cog from "../assets/gear.svg";
import arrow from "../assets/arrow.svg";

import { Link } from "react-router-dom";

export default function Header() {
	function goBack() {
		window.history.back();
	}

	return (
		<>
			<header id='header'>
				<img onClick={goBack} className='headerArrow' src={arrow} alt='' />
				<Link to={"/"}>
					<img className='headerLogo' src={logo} alt='' />
				</Link>
				<img className='headerGear' src={cog} alt='' />
			</header>
		</>
	);
}
