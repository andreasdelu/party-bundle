import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Meyer from "./pages/Meyer";
import DiceGames from "./pages/DiceGames";
import Difficulty from "./pages/Difficulty";
import AddPlayers from "./pages/AddPlayers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<HomePage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/dice' element={<DiceGames />} />
				<Route path='/meyer' element={<Meyer />} />
				<Route path='/difficulty' element={<Difficulty />} />
				<Route path='/players' element={<AddPlayers />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
