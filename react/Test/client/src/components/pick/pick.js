import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './pick.css';
 
const Pick = ()=> {
    const [station, setStation] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [data, setData] = useState()

    const getStacje = async() =>{
        setisLoading(true);
        let temp = await fetch('/baza').then(res => res.json());
        setisLoading(false);
        console.log(temp);
        setStation(temp);
    }
    const getChange = (e) =>{
      console.log(e.target.value)
      setData([10,11].push(12))
      
    }
    if (isLoading) {
        return <p>Ładowanie...</p>
    }
    window.addEventListener('load', getStacje);

  return (
    
  
    <div class='content'>
    {station &&                
                    
                    <select name="stacje" onChange={getChange}>
                      <optgroup label="Stacja">
                        {station.map(station =>
                            <option value={station.kod_stacji}>{station.Id} - {station.nazwa_stacji}</option>)}
                      </optgroup>
                    </select>
    }

    {!station &&
    <a onClick={getStacje}>no ładnie</a>
    }
    {data &&  <Plot
            data={[
              {
                x: [1,2,3],
                y: [21, 3, 7],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              
            ]}
            layout={ {width: 800, height: 600, title: 'Piękny wykres danych bez sensu'} }
            />
      }
    </div>
  );
}

export default Pick;
