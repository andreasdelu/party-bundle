import React from "react";
import "../styles/Header.css";

import logo from "../assets/logo.svg";
import cog from "../assets/gear.svg";
import home from "../assets/house.svg";

import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<header id='header'>
				<Link to={"/"}>
					<img className='headerHome' src={home} alt='' />
				</Link>
				<img className='headerLogo' src={logo} alt='' />
				<img className='headerGear' src={cog} alt='' />
			</header>
		</>
	);
}
