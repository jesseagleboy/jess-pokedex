import React from "react";
import { useLocation, useParams } from "react-router-dom";
import './Pokemon.css';

const getPokemon = async (pokemonParam) => {
  const response = await fetch(`/api/pokemon/${pokemonParam}`);
  console.log(response);
  if (response.ok) {
    const jsonResponse = await response.json();
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
  // Always use state. do not use global variables
  const [pokePage, setPokePage] = React.useState({Name: '', Energy: '', Image: ''});

  React.useEffect(() => {
    async function doEffect() {
      let pokemon
      // If we came here from the home page, we have all the data saved in location state
      if (location.state != null && location.state.pokemon != null) {
        pokemon = location.state.pokemon
      // Otherwise, we need to query it using the pokemon name from the path props
      } else {
        pokemon = await getPokemon(params.pokemon)
      }
      setPokePage(pokemon)
    }
    doEffect()
  }, []); // Only do on first mount

  return (
    <div className='pokemon'>
      <img src={pokePage.Image} alt={pokePage.Name}/>
      <h2 className='name'>Name: {pokePage.Name}</h2>
      <h3 className='energy'>Energy: {pokePage.Energy}</h3>
    </div>
  );
}

export default Pokemon;
