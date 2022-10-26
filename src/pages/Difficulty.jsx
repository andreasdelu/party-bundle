import React from "react";
import ButtonBig from "../components/ButtonBig";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import diff1 from "../assets/diff-1.svg";
import diff2 from "../assets/diff-2.svg";
import diff3 from "../assets/diff-3.svg";

//Underside til difficulty, hvor de sværghedsgrader inde på undersiden bliver fremvist

export default function Difficulty() {
	const { game } = useParams();
	return (
		//3 forskellige difficulties, som ændre sværghedsgrader i forhold til de forskellige spil
		<>
			<Header />
			<p className='bodyText'>Choose Difficulty:</p>
			<div className='centerContainer'>
				<Link className='buttonLink' to={`/game/${game}/diff-1`}>
					<ButtonBig
						extraStyle={{ size: "45%", dropOpacity: "0.2" }}
						image={diff1}
						text={"Lightweight"}
					/>
				</Link>
				<Link className='buttonLink' to={`/game/${game}/diff-2`}>
					<ButtonBig
						extraStyle={{ size: "45%", dropOpacity: "0.2" }}
						image={diff2}
						text={"Seasoned"}
					/>
				</Link>
				<Link className='buttonLink' to={`/game/${game}/diff-3`}>
					<ButtonBig
						extraStyle={{ size: "50%", dropOpacity: "0.2" }}
						image={diff3}
						text={"Veteran"}
					/>
				</Link>
			</div>
		</>
	);
}
