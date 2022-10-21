import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiceGames from "./pages/DiceGames";
import Difficulty from "./pages/Difficulty";
import AddPlayers from "./pages/AddPlayers";
import Game from "./pages/Game";
import MiniGames from "./pages/MiniGames";
import ErrorPage from "./pages/ErrorPage";
import CardGames from "./pages/CardGames";
import SocialGames from "./pages/SocialGames";
import { saveTimeTotal, saveTimeSession } from "./modules/Save";
import SpinWin from "./components/games/SpinWin";

setInterval(() => {
	saveTimeTotal();
	saveTimeSession();
}, 60000);
saveTimeTotal();
saveTimeSession();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<ErrorPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/dice' element={<DiceGames />} />
				<Route path='/mini' element={<MiniGames />} />
				<Route path='/cards' element={<CardGames />} />
				<Route path='/social' element={<SocialGames />} />
				<Route path='/spinwin' element={<SpinWin />} />
				<Route path='/game/:game/:diff' element={<Game />} />
				<Route path='/game/:game/difficulty/' element={<Difficulty />} />
				<Route path='/game/:game/players/' element={<AddPlayers />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
