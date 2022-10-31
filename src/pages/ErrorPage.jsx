import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error.css";
import Header from "../components/Header";
import drunk from "../assets/404-drunky.svg";

//Error page er hvis brugeren går ind på et link som ikke fører til noget, fx hvis du skriver noget oppe i linkaddressen som ikke er i koden
export default function ErrorPage() {
	return (
		<>
			<Header />
			<div className='error-container'>
				<h1 className='titel-error'>404</h1>
				<p className='textBody'>We went a little too hard last night...</p>
				<img className='ErrorImage' src={drunk} alt='404' />
				<p className='textBody'>
					We can't seem to find the page you requested <br /> <br />
					<Link to={"/"}>Return to homepage</Link>
				</p>
			</div>
		</>
	);
}
