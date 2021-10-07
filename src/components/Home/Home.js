import {Link} from 'react-router-dom';
import './Home.css';

function Home(props) {

  return (
    <div>
        {props.pokemonList.map((Pokemon, index) => {
          return <Link key={index} to={{
            pathname: `${Pokemon.Name}`,
            state: {pokemon: Pokemon}
          }}><img src={`${Pokemon.Image}`} alt={`${Pokemon.Name}`} />
          </Link>
        })}
    </div>
        
  );
}

export default Home;
