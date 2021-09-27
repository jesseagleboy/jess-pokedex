//import logo from '../../logo.svg';
import "./App.css";
import {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import Home from '../Home/Home';
const PokemonDatabaseURL = "http://192.168.1.3:3001";

const getPokemonList = async () => {
  const response = await fetch(`${PokemonDatabaseURL}`);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse.Pokemon;
  }
};
  

function App() {
  
  const [pokemonList, setPokemonList] = useState([]);
  //const [chosenPokemon, setChosenPokemon] = useState([]);
  if (pokemonList.length === 0) {
    getPokemonList().then((response) => setPokemonList(response));
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home pokemonList={pokemonList}/>
          </Route>
          <Route path='/:Pokemon'>
            <Pokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
