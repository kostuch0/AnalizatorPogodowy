import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './pick.css';
 
const Pick = ()=> {
    const [station, setStation] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [data, setData] = useState()
    const [daty,setDaty] = useState()
    const [nazwa,setNazwa] = useState()
    const [dataStart, setDataStart]= useState('2001','01','01')
    const [dataStop, setDataStop]= useState('2020','01','01')


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
      //setData([10,11].push(12))
      station.map(station => {if(station.kod_stacji === e.target.value){
          setNazwa(station.nazwa_stacji)
        }}
        )
      loadTemps(e.target.value);
      
    }
    const fromDateChange = (e) =>{
      setDataStart(e.target.value.split())
    }
    const toDateChange = (e) =>{
      setDataStop(e.target.value.split())
    }


 
    const loadTemps = async(code) =>{
      temps = [];
      dates = [];
      var tempDates = [];
      temps = await fetch('/baza/temp/' + code  ).then(res => res.json());
      tempDates = await fetch('/baza/data/' + code).then(res => res.json());
      console.log(tempDates);
      //+'/' + dataStart[0] + '/' + dataStart[1] + '/' + dataStart[2] + '/' +dataStop[0]+ '/' + dataStop[1]+ '/' + dataStop[2] 
      tempDates.map(tempDates=>{dates.push(tempDates.rok + "/" + tempDates.miesiac + "/" + tempDates.dzien)})

      //console.log("Tablica temperatur: " + temps);
      //console.log("Tablica dat: " + dates);
      setData(temps)
      setDaty(dates)
    }

    if (isLoading) {
        return <p>Ładowanie...</p>
    }
    window.addEventListener('load', getStacje);

  return (
    
  
    <div className='content'>
    {station &&      <div className='wykres'>           
                    
                    <form><br></br>Data początkowa<br></br>
                    <input type='date'  min='2001-01-01' max='2020-01-01' name='od' onChange={fromDateChange} ></input><br></br>
                    Data końcowa<br></br>
                    <input type='date'  min='2001-01-01' max='2020-01-01' name='do' onChange={toDateChange} ></input>
                    </form>
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
                x: daty,
                y: data[2],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'red'},
                name: "Maksymalna"
              },
              {
                x: daty,
                y: data[1],
                type: 'scatter',
                mode: 'lines',
                marker: {color: 'green'},
                name: "Średnia"
              },
              {
                x: daty,
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
