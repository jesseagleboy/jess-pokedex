const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
// import {dirname} from 'path';
// import path from 'path';
// import { fileURLToPath }from 'url';

//Needed to make a dirname variable since "type = module" invalidates the one under the hood
//const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new sqlite3.Database(process.env.TEST_DATABASE || 'src/Pokemon.db', err => {
    if (err) {
        console.log(err);
    }

    console.log('Success!');
});

console.log(db);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));
app.use(cors());

//app.use(express.static('public'));

const formatName = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}



app.get('/', (req, res, next) => {
    console.log('This is in /');
    console.log('Hi');
    db.all("SELECT * FROM Pokemon", (err, rows) => {
        if (err) {
            console.log(err);
        }

        res.send({Pokemon: rows});
    });

});

app.get('/ten', (req, res, next) => {
    console.log('Hello, everyone!');
    res.status(200).send('<h1>Hi, World!</h1>');
});

app.get('/chickenTest', (req, res, next) => {
    console.log('We got the chicken test');
    res.send({text: 'This is a chicken response'});
});

app.get('/:name', (req, res, next) => {
    const formattedName = formatName(req.params.name);
    db.get("SELECT * FROM Pokemon WHERE name = $name", {$name: formattedName}, (err, row) => {
        if (err) {
            console.log(err);
        }
        //res.sendFile(path.join(__dirname, '/public', 'pokemon.html'));
        res.status(200).send({pokemon: row});
    });
});



app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
