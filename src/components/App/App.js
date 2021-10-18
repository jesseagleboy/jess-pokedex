//import logo from '../../logo.svg';
import "./App.css";
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import Home from '../Home/Home';

const getPokemonList = async (chosenDeck) => {
  const response = await fetch(`/api/pokemon/${chosenDeck}`);
  console.log(response);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse.Pokemon;
  }
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [chosenDeck, setChosenDeck] = useState('');

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
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home pokemonList={pokemonList} setChosenDeck={setChosenDeck} chosenDeck={chosenDeck}/>
          </Route>
          <Route path='/:category/:id/:name'>
            <Pokemon />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
