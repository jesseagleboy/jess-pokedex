import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import "./Home.css";

function Home(props) {
  let rotateToBe = true;
  let cardsClass = isMobile
    ? ["divmobile", "mobileList"]
    : ["divdesktop", "imgoflist"];
  const [idPrint, setIdPrint] = useState("");

  useEffect(() => {
    setIdPrint("Select a card");
  }, []);

  function cardInfo(e) {
    setIdPrint(e.target.alt);
  }

  function childNodes(e) {
    if (!isMobile) {
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
          } else {
            //console.log(rightPattern);
            rightPattern += degreeAmount;
            finalRotate = Math.abs(rightPattern);
            //console.log("slideOut in rotateRight ", finalRotate);
          }

          //console.log(finalRotate);

          const pokeChild = children[i].children[0];
          pokeChild.style.transform = `rotate(${finalRotate}deg)`;
          pokeChild.style.transformOrigin = "left bottom";
          pokeChild.style.transition = "transform 2s";
        }
        rotateToBe = false;
      }
    }
  }

  function closeNodes(e) {
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

  function deckChoice(e) {
    props.setChosenDeck(e.target.innerText);
  }

  function deckNotChoice(e) {}

  function deckShown() {
    if (props.chosenDeck !== "Random") {
      return props.pokemonList.map((Pokemon, index) => {
        return (
          <Link
            key={index}
            to={{
              pathname: `${Pokemon.category}/${Pokemon.id}/${Pokemon.name}`,
              state: { pokemon: Pokemon },
            }}
          >
            <img
              className={cardsClass[1]}
              onMouseEnter={cardInfo}
              src={`${Pokemon.image}`}
              alt={`${Pokemon.name}`}
              style={{borderRadius: '5%'}}
            />
          </Link>
        );
      });
    }
  }

  return (
    <div className={cardsClass[0]}>
      <div id="deckTexts">
        <h5 id="header">Deck Type</h5>
        <p
          className="choice"
          id="water"
          onMouseOver={deckChoice}
          onMouseLeave={deckNotChoice}
        >
          Water-Metal
        </p>
        <p
          className="choice"
          id="fire"
          onMouseOver={deckChoice}
          onMouseLeave={deckNotChoice}
        >
          Fighting-Electric
        </p>
        <p
          className="choice"
          id="random"
          onMouseOver={deckChoice}
          onMouseLeave={deckNotChoice}
        >
          Random
        </p>
      </div>

      <p>{props.chosenDeck} has been chosen.</p>
      <p>Card Name: {idPrint}</p>

      <div onMouseOver={childNodes} onMouseLeave={closeNodes}>
        {deckShown()}
      </div>
    </div>
  );
}

export default Home;
