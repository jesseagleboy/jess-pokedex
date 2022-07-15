const express = require("express");
const morgan = require("morgan");
const {Client} = require("pg");
const cors = require("cors");
const path = require("path");
const app = express();


const client = new Client({
	host: "ec2-54-172-175-251.compute-1.amazonaws.com",
	user: "njrbbkodlzbgnd",
	port: 5432,
	password: "426eefce72d91ee90f3f12a0c71df2a956e90ab2e41d48d429e5cfa8bb33f345",
	database: "ddb9k17ibmmido",
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});


//console.log(client, 'client');

client.connect();

app.use(express.static(path.join(__dirname, "build")));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.text());
app.use(morgan("dev"));
app.use(cors());

const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// This gets all pokemon
app.get("/api/pokemon/:deckName", (req, res) => {
  console.log("Hi, there");
  const deckName = req.params.deckName;
  console.log(deckName, "deckName");
  client.query(
		`SELECT * FROM "Trainer"
    WHERE "deckID" = '${deckName}'
    UNION ALL
    SELECT * FROM "Energy"
    WHERE "deckID" = '${deckName}'`,
		(err, rows) => {
			if (err) {
				console.log(err);
			}
			console.log(rows);

			res.send(rows?.rows);
			//client.end();
		}
	);
});

// This gets specific pokemon
app.get("/api/:category/:id/:name", (req, res) => {
  if (req.params.name === null) {
    console.log("This is empty!");
    res.send({ pokemon: null });
  }

  console.log(req.params);
  console.log("We are here!");

  const formattedName = formatName(req.params.name);
  // General note here - you are being very inconsistent with your casing. Sometimes you write Name, sometimes name
  // sometimes Pokemon, sometimes pokemon, sometimes Energy, sometimes energy. you get the idea. you gotta be
  // consistent. I would recommend renaming everything to be camelCase
  client.query(
    `SELECT * FROM "${req.params.category}" WHERE id=${req.params.id}`,
    (err, row) => {
      if (err) {
        console.log(err);
      }
      console.log(row?.rows, 'testing section');
      res.status(200).send({ pokemon: row?.rows[0] });
    }
  );
});

// You need to send the index.html that loads all the react code for every route that isnt getting data from the API
app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
