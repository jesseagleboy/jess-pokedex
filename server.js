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


app.get('/homefetch', (req, res, next) => {
    console.log('Hi, there');
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



app.get('/pokemon/:name', (req, res, next) => {
    
    if (req.params.name === null) {
        console.log("This is empty!");
        res.send({pokemon: null});
    }
    
    const formattedName = formatName(req.params.name);
    db.get("SELECT * FROM Pokemon WHERE name = $name", {$name: formattedName}, (err, row) => {
        if (err) {
            console.log(err);
        }
        res.status(200).send({pokemon: row});
    });
});

app.get('/:name', (req, res, next) => {
    
    res.send(`<p>Hello, there!</p>`)
});



app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
