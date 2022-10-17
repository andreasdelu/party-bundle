import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Meyer from "../components/games/Meyer";
import ReactionGame from "../components/games/ReactionGame";
import Never from "../components/games/Never";
import Pictionary from "../components/games/Pictionary";
import OverUnder from "../components/games/OverUnder";

export default function Game() {
	const { game, diff } = useParams();
	const [difficulty, setDifficulty] = useState("");
	const [currentRule, setCurrentRule] = useState("");

	useEffect(() => {
		setDifficulty(diff.split("-")[1]);
	}, [diff]);

	const rules = [
		{
			name: "meyer",
			title: "Meyer",
			rule: (
				<div className='dialogRules'>
					<h4>How to play!</h4>
					<h5>Combinations:</h5>
					<ul>
						<li>1+2: Meyer!</li>
						<li>1+3: Little Meyer!</li>
						<li>2+3: Cheers!</li>
						<li>6+6: Pair 6 and so on</li>
						<li>6+5: 65 and so on</li>
					</ul>
					<h5>Next player</h5>
					<p>The next player has to roll higher than the previous player </p>
					<h5>Roll</h5>
					<p>
						Upon rolling the dice, the player have the option to lie or tell the
						truth{" "}
					</p>
					<h5>Lift</h5>
					<p>
						{" "}
						If the player dont believe what the previous player has said they
						rolled, the player have the option to lift, to showcase if the
						previous player lied or not.{" "}
					</p>
					<p>
						If the previous player lied, they have to drink, if they told the
						truth, the player who choosed lift, has to drink{" "}
					</p>
					<h5>It or above</h5>
					<p>
						If the player did not roll higher than the previous player, they
						will have a second chance, but what is rolled is not showcased for
						them.{" "}
					</p>
				</div>
			),
		},
		{
			name: "reaction",
			title: "Reaction",
			rule: (
				<div className='dialogRules'>
					<h4>How to play!</h4>
					<p>
						Click on the circles as fast as you can, and test your reaction
						time, whoever has the slowest time amongst the group, has to drink!{" "}
					</p>
				</div>
			),
		},

		{
			name: "pictionary",
			title: "Pictionary",
			rule: (
				<div className='dialogRules'>
					<h4>How to play!</h4>
					<h5>Divide into groups of 2</h5>
					<p>
						When it is your teammates turn to draw, you have to guess what he
						has drawn on the canvas{" "}
					</p>
					<p>If you guess correctly the opposite team has to drink </p>
					<p>If you guess incorrect your team has to drink </p>
				</div>
			),
		},

		{
			name: "never",
			title: "Never Have I Ever",
			rule: (
				<div className='dialogRules'>
					<h4>How to play!</h4>
					<p>click on the card to see the next question </p>
					<p>
						A card is shown, if you have done what is shown on the card, you
						have to drink, otherwise dont.{" "}
					</p>
				</div>
			),
		},

		{
			name: "overunder",
			title: "Over/Under",
			rule: (
				<div className='dialogRules'>
					<h4>How to play!</h4>
					<p>
						The player have the option to choose between higher or lower of the
						card that is shown, if you guess incorrectly you have to drink!
					</p>
					<p>Ranging between Ace being the lowest and king being the highest</p>

					<p>
						Whoever gets the lowest score amongst your group, has to do a dare,
						chosen by the winner
					</p>
				</div>
			),
		},
	];

	useEffect(() => {
		rules.forEach((rule) => {
			if (rule.name === game) {
				setCurrentRule(rule);
			}
		});
	}, []);

	return (
		<>
			<Header showRules={true} ruleContent={currentRule} />
			{game === "meyer" && <Meyer diff={difficulty} />}
			{game === "reaction" && <ReactionGame diff={difficulty} />}
			{game === "pictionary" && <Pictionary diff={difficulty} />}
			{game === "never" && <Never diff={difficulty} />}
			{game === "overunder" && <OverUnder diff={difficulty} />}
		</>
	);
}
