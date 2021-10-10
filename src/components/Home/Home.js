import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {
  console.log(props.pokemonList.length);
  let rotateLeft = 0;
  let rotateToBe = true;

  //build a stylesheet in a function to attribute to each individual image (work in progress)

  function childNodes(e) {
    const children = e.target.parentNode.parentNode.children;
    const imgsLength = children.length;
    const degreeAmount = 10;
    //This is the format to get to the specific img tag.
    //console.log(children[num].children[0] -> There is only one img in the <a> tag so it's always 0);
    if (rotateToBe) {
      const median = Math.floor(imgsLength / 2);
      let rightPattern = 0;
      let leftPattern = median * degreeAmount;
      let finalRotate = 0;

      for (let i = 0; i < imgsLength; i++) {
        if (i < median) {
          leftPattern -= degreeAmount;
          finalRotate = leftPattern * -1;
          console.log("slideOut in rotateLeft ", rotateLeft);
        } else {
          console.log(rightPattern);
          rightPattern += degreeAmount;
          finalRotate = Math.abs(rightPattern);
          console.log("slideOut in rotateRight ", finalRotate);
        }

        console.log(finalRotate);

        console.log(i);
        const pokeChild = children[i].children[0];
        pokeChild.style.transform = `rotate(${finalRotate}deg)`;
        pokeChild.style.transformOrigin = "left bottom";
        pokeChild.style.transition = "transform 2s";
      }

      rotateToBe = false;
    }
  }

  function closeNodes (e) {
    console.log('This has closed');
    const children = e.target.parentNode.parentNode.children;
    const imgsLength = children.length;

    if (!rotateToBe) {
      for (let i = 0; i < imgsLength; i++) {
        const pokeChild = children[i].children[0];
        pokeChild.style.transform = `rotate(0deg)`;
        pokeChild.style.transformOrigin = "left bottom";
        pokeChild.style.transition = "transform 2s";
      }

      rotateToBe = true;
    }
  }

  return (
    <div className="listdiv" onMouseOver={childNodes} onMouseOut={closeNodes}>
      {props.pokemonList.map((Pokemon, index) => {
        return (
          <Link
            key={index}
            to={{
              pathname: `${Pokemon.Name}`,
              state: { pokemon: Pokemon },
            }}
          >
            <img src={`${Pokemon.Image}`} alt={`${Pokemon.Name}`} />
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
