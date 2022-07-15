//import logo from '../../logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import Home from "../Home/Home";

const getPokemonList = async chosenDeck => {
	const response = await fetch(`https://jess-pokedex.herokuapp.com/api/pokemon/${chosenDeck}`);
	console.log(response);
  if (response.ok) {
    console.log('around here')
    const jsonResponse = await response.json();
    console.log(jsonResponse, 'jsonResponse');
		return jsonResponse;
	}
};

function App() {
	const [pokemonList, setPokemonList] = useState([]);
	const [chosenDeck, setChosenDeck] = useState("Fighting-Electric");

	console.log(pokemonList);

	// Always put effects in a useEffect hook
	useEffect(() => {
		// Use effect function cant be async, so create an inner async function to do async stuff
		async function doEffect() {
		  const pokemonList = await getPokemonList(chosenDeck);
		  setPokemonList(pokemonList);
		}
		doEffect();
	}, [chosenDeck]); // Empty array here means "only do this the first time the component gets mounted"

	return (
		<>
			<div className='App'>
				<div className='header'>
					<a href='https://fontmeme.com/pokemon-font/'>
						<img src='https://fontmeme.com/permalink/211019/63c19ace88081b7e1ba06b9f05f1aa2c.png' alt='pokemon-font' border='0' />
					</a>
					<img src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' alt='logo' />
				</div>
			</div>
			<Router>
				<Routes>   
					<Route index path='/' element={<Home chosenDeck={chosenDeck} setChosenDeck={setChosenDeck} pokemonList={pokemonList} />} />
					<Route path='/:category/:id/:name' element={<Pokemon />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
