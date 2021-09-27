//import logo from '../../logo.svg';
import "./App.css";
import {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Pokemon from "../Pokemon/Pokemon";
import Home from '../Home/Home';

const getPokemonList = async () => {
  const response = await fetch(`/homefetch`);
  console.log(response);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse.Pokemon;
  }
};
  

function App() {
  
  const [pokemonList, setPokemonList] = useState([]);

  console.log(pokemonList);

  if (pokemonList.length === 0) {
    getPokemonList().then((response) => setPokemonList(response));
    console.log(pokemonList);
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
