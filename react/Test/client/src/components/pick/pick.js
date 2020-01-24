import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './pick.css';
 
const Pick = ()=> {
    const [station, setStation] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [data, setData] = useState()
    const [numerStacj,setNumerStacji] = useState()
    const [nazwa,setNazwa] = useState()
    const [dataStart, setDataStart]= useState(['2001','01','01'])
    const [dataStop, setDataStop]= useState(['2020','01','01'])


    let temps = [];
    let dates = [];

    const getStacje = async() =>{
        setisLoading(true);
        let temp = await fetch('/baza').then(res => res.json());
        setisLoading(false);
        //console.log(temp);
        setStation(temp);
    }
    const getChange = (e) =>{
      //console.log(e.target.value)
      setNumerStacji(e.target.value);
      //setData([10,11].push(12))
      station.map(station => {if(station.kod_stacji === e.target.value){
          setNazwa(station.nazwa_stacji)
        }}
        )
      
      loadTemps(e.target.value);
      
    }
    const fromDateChange = (e) =>{
      setDataStart(e.target.value.split('-'))
    }
    const toDateChange = (e) =>{
      setDataStop(e.target.value.split('-'))
    }
    const doTheHarlemShake = (e) =>{
       loadTemps(numerStacj)
    }


 
    const loadTemps = async(code) =>{
      temps = [];
      dates = [];
      //var tempDates = [];
      //temps = await fetch('/baza/temp/' + code ).then(res => res.json());
      var formula = '/baza/temp/' + code +'/' + dataStart[0] + '/' + dataStart[1] + '/' + dataStart[2] + '/' +dataStop[0]+ '/' + dataStop[1]+ '/' + dataStop[2] ;
      console.log(formula);
      temps = await fetch(formula).then(res => res.json());

      //tempDates = await fetch('/baza/data/' + code).then(res => res.json());
     // console.log(tempDates);
      //+'/' + dataStart[0] + '/' + dataStart[1] + '/' + dataStart[2] + '/' +dataStop[0]+ '/' + dataStop[1]+ '/' + dataStop[2] 
     // tempDates.map(tempDates=>{dates.push(tempDates.rok + "/" + tempDates.miesiac + "/" + tempDates.dzien)})
      //temps.map(temps => {dates.push(temps[3]+'/'+temps[4]+'/'+temps[5])})
      //console.log("Tablica temperatur: " + temps);
      //console.log("Tablica dat: " + dates);
      setData(temps)
      //setDaty(dates)
      //console.log(dates)
    }

    if (isLoading) {
        return <p>Ładowanie...</p>
    }
    window.addEventListener('load', getStacje);
   // window.addEventListener('load', loadTemps(252150270));
    
    

  return (
    
  
    <div className='content'>
    {station &&      <div className='wykres'>           
                    
                    <form><br></br>Data początkowa<br></br>
                    <input type='date'  min='2001-01-01' max='2020-01-01' name='od' onChange={fromDateChange} ></input><br></br>
                    Data końcowa<br></br>
                    <input type='date'  min='2001-01-01' max='2020-01-01' name='do' onChange={toDateChange} ></input>
                    </form>
                    <button onClick={doTheHarlemShake}>Przeładuj</button><br></br>
                    <select name="stacje" onChange={getChange}>
                      <optgroup label="Stacja">
                        {station.map(station =>
                            <option value={station.kod_stacji} title={station.nazwa_stacji}>{station.Id} - {station.nazwa_stacji}</option>)}
                      </optgroup>
                    </select></div>
    }

    {!station &&
    <a onClick={getStacje}>no ładnie</a>
    }
    {data &&  <Plot
    
            data={[
              {
                x: data[3],
                y: data[2],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'red'},
                name: "Maksymalna"
              },
              {
                x: data[3],
                y: data[1],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'green'},
                name: "Średnia"
              },
              {
                x: data[3],
                y: data[0],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'blue'},
                name: "Minimalna"
              },


              
              
            ]}
            layout={ {width: 800, height: 600, title: 'Wykres temperaturowy: '+nazwa} }
            />
      }
    </div>
  );
}

export default Pick;
