import React from "react";
import { useLocation, useParams } from "react-router-dom";
import './Pokemon.css';

const getPokemon = async (pokemonParam) => {
  const response = await fetch(`https://jess-pokedex.herokuapp.com/api/${pokemonParam.category}/${pokemonParam.id}/${pokemonParam.name}`);
  console.log(response, 'specific pokemon response');
  console.log(response);
  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse, 'jsonResponse inside Pokemon');
    if (jsonResponse.hasOwnProperty("pokemon")) {
        return jsonResponse.pokemon;
    } else {
      return { Name: "Unknown", Energy: "Mysterious", Image: "" };
    }
  }
};

function Pokemon(props) {
  const location = useLocation();
  const params = useParams();
  console.log('This is params: ', useParams());
  // Always use state. do not use global variables
  const [pokePage, setPokePage] = React.useState({Name: '', Energy: '', Image: ''});

  const pokemonState = location.state?.pokemon

  React.useEffect(() => {
    async function doEffect() {
      let pokemon
      // If we came here from the home page, we have all the data saved in location state
      if (pokemonState != null) {
        pokemon = pokemonState
      // Otherwise, we need to query it using the pokemon name from the path props
      } else {
        pokemon = await getPokemon(params);
        console.log(pokemon, 'try pokemon')
      }
      setPokePage(pokemon)
    }
    doEffect()
  }, [params.pokemon, params, pokemonState]); // Fetch on first time and whenever either of these change

  return (
    <div className='pokemon'>
      <img className='img' src={pokePage.image} alt={pokePage.name}/>
      <h2 className='name'>Name: {pokePage.category}</h2>
      <h3 className='energy'>Energy: {pokePage.name}</h3>
    </div>
  );
}

export default Pokemon;
