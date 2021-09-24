import {Link} from 'react-router-dom';

function Home(props) {

  return (
    <div>
        {props.pokemonList.map(Pokemon => {
          return <Link to={{
            pathname: `${Pokemon.Name}`,
            state: {pokemon: Pokemon}
          }}><img src={`${Pokemon.Image}`} alt={`${Pokemon.Name}`} />
          </Link>
        })}
    </div>
        
  );
}

export default Home;
