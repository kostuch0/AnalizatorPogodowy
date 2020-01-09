const express = require('express');

const app = express();

app.get('/get/data',(req, res)=>{
    const data = [
        {id:1, firstName:'Grześ', lastName:'Kostecki'},
        {id:2, firstName:'Kornel', lastName:'Ochęduszko'},
        {id:3, firstName:'Andrzej', lastName:'Kolasa'},
        {id:4, firstName:'Mateusz', lastName:'Ples'}    
    ];
    res.json(data);
});
app.get('/', (req, res) => res.send(
   '<center><h2>A czego tu szukasz? Pewnie jakiego diabła!</h2></center>'
))

const port = 9988;

app.listen(port, ()=> console.log(`Uruchomiono server na porcie ${port}`));