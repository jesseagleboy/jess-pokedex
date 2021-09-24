import React from "react";
import { useLocation } from "react-router-dom";
import './Pokemon.css';

const PokemonDatabaseURL = "http://192.168.1.3:3001";

const pokePage = {name: '', energy: '', image: ''};

const getPokemon = async (pokemonParam) => {
  const response = await fetch(`${PokemonDatabaseURL}/${pokemonParam}`);
  if (response.ok) {
    const jsonResponse = await response.json();
    if (jsonResponse.hasOwnProperty("pokemon")) {
        return jsonResponse;
    } else {
      return { pokemon: { Name: "Unknown", Energy: "Mysterious", image: "" } };
    }
  }
};

function Pokemon(props) {
  const location = useLocation();

  if (location.state === undefined) {
    const pokemon = window.location.pathname.match(/[A-Za-z]/g);
    const joinString = pokemon.join("");
    getPokemon(joinString).then((response) => {
      pokePage.name = response.pokemon.Name;
      pokePage.energy = response.pokemon.Energy;
      pokePage.image = response.pokemon.Image;
    });
  } else {
    pokePage.name = location.state.pokemon.Name;
    pokePage.energy = location.state.pokemon.Energy;
    pokePage.image = location.state.pokemon.Image;
  }

  return (
    <div className='pokemon'>
      <img src={pokePage.image} alt={pokePage.name}/>
      <h2 className='name'>Name: {pokePage.name}</h2>
      <h3 className='energy'>Energy: {pokePage.energy}</h3>
    </div>
  );
}

export default Pokemon;
