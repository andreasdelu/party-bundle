import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<>
			<h1 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: 0 }}>
				404
			</h1>
			<p className='bodyText'>
				I guess we went a little too hard last night... <br />
				We can't seem to find the page you requested :( <br />
				<Link to={"/"}>Return to homepage</Link>
			</p>
		</>
	);
}
