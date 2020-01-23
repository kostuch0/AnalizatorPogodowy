const express = require('express');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('DanePogodowe2.db');

var avc = [];

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

app.get('/baza', (req, res) =>{
    db.serialize(function () {
         db.all('SELECT * FROM stacje', function (err, row) {
        // console.log(row);
        res.json(row)
      })
    })
})

app.get('/baza/temp/:kod_stacji', (req, res) =>{
  let tempsMin = [];
  let tempsSr = [];
  let tempsMax = [];
  let temps = [];
  db.serialize(function () {
  db.all('SELECT min_temp_dob, sred_temp_dob, max_temp_dob FROM dane  WHERE kod_stacji = '+ req.params.kod_stacji,
   function (err, rows) {
//  console.log(row[1]);
  rows.forEach((row)=>{
    tempsMin.push(Object.values(row)[0]);
    tempsSr.push(Object.values(row)[1]);
    tempsMax.push(Object.values(row)[2]);
  })
//  console.log(temps);
temps.push(tempsMin);
temps.push(tempsSr);
temps.push(tempsMax);
console.log(temps[0]);
console.log(temps[1]);
console.log(temps[2]);
  res.json(temps);
   })
  })
})

app.get('/baza/temp/:kod_stacji/:rokp/:miesp/:dzienp/:rokz/:miesz/:dzienz', (req, res) =>{
  let date = [];
  db.serialize(function () {
  db.all('SELECT min_temp_dob, sred_temp_dob, max_temp_dob FROM dane  WHERE kod_stacji = '+ req.params.kod_stacji
  + ' AND rok >='
          + req.params.rokp + " AND rok <= " + req.params.rokz + "AND miesiac >= " + req.params.miesp + " AND miesiac <= "
          + req.params.miesz + " AND dzien >= " + req.params.dzienp + " AND dzien <= " + req.params.dzienz,
          function (err, rows) {
            //  console.log(row[1]);
              rows.forEach((row)=>{
                tempsMin.push(Object.values(row)[0]);
                tempsSr.push(Object.values(row)[1]);
                tempsMax.push(Object.values(row)[2]);
              })
            //  console.log(temps);
            temps.push(tempsMin);
            temps.push(tempsSr);
            temps.push(tempsMax);
            console.log(temps[0]);
            console.log(temps[1]);
            console.log(temps[2]);
              res.json(temps);
               })
              })
            })

app.get('/baza/data/:kod_stacji', (req, res) =>{
  let date = [];
  db.serialize(function () {
  db.all('SELECT rok, miesiac, dzien FROM dane  WHERE kod_stacji = '+ req.params.kod_stacji,
   function (err, rows) {
//  console.log(rows);
  rows.forEach((row)=>{
    //date.push(Object.values(row)[0] + "/" + Object.values(row)[1] + "/" + Object.values(row)[2]);
    date.push(row);
  })
 // console.log(date);
  res.json(date);
   })
  })
})

app.get('/nazwa/:kod_stacji', (req, res) =>{
    db.serialize(function () {
    db.all('SELECT * FROM dane  WHERE kod_stacji = '+ req.params.kod_stacji,
     function (err, row) {
   //console.log(row);
  res.json(row);
     })
    })
})

app.get('/nazwa/:kod_stacji/:rok_pocz/:rok_zak', (req, res) =>{
    db.serialize(function () {
         db.all('SELECT * FROM dane  WHERE kod_stacji = '+ req.params.kod_stacji + ' AND rok >='
          + req.param("rok_pocz") + " AND rok <= " + req.params.rok_zak,
           function (err, row) {
         //console.log(row);
        res.json(row)
      })
    })
})  

const port = 9988;

app.listen(port, ()=> console.log(`Uruchomiono server na porcie ${port}`));