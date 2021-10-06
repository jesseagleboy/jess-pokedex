const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const path = require('path');
const app = express();


const db = new sqlite3.Database(process.env.TEST_DATABASE || 'src/Pokemon.db', err => {
    if (err) {
        console.log(err);
    }

    console.log('Success!');
});

app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));
app.use(cors());

const formatName = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// This gets all pokemon
app.get('/api/pokemon', (req, res, next) => {
    console.log('Hi, there');
    db.all("SELECT * FROM Pokemon", (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.send({Pokemon: rows});
    });

});

// This gets specific pokemon
app.get('/api/pokemon/:name', (req, res, next) => {
    if (req.params.name === null) {
        console.log("This is empty!");
        res.send({pokemon: null});
    }

    const formattedName = formatName(req.params.name);
    // General note here - you are being very inconsistent with your casing. Sometimes you write Name, sometimes name
    // sometimes Pokemon, sometimes pokemon, sometimes Energy, sometimes energy. you get the idea. you gotta be
    // consistent. I would recommend renaming everything to be camelCase
    db.get("SELECT * FROM Pokemon WHERE name = $name", {$name: formattedName}, (err, row) => {
        if (err) {
            console.log(err);
        }
        res.status(200).send({pokemon: row});
    });
});

// You need to send the index.html that loads all the react code for every route that isnt getting data from the API
app.use('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
