import React from 'react';
import './App.css';
import './nav.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/about/about';
import Home from './components/home/home'
const Nav =()=> {
  const changeLocation = (res) =>{
    var clicked = res.currentTarget.id
    switch (clicked) {
      case "home":
        window.location.href = '../';
        break;
      case "about":
        window.history.pushState({}, null, '../about');
        //window.location.href = '../about'
        break;
      case "stats":
        console.log(clicked)
        window.history.pushState({}, null, '../stats');
        break;
      case "pogoda":
        console.log(clicked)
        window.history.pushState({}, null, '../pogoda');
        break;
      default:
        window.location.href = '../'+clicked;
        break;
    }
    
  }
  return (
    
    <div class="App" className="App">
      <div onClick={changeLocation} class='logo'></div>
      <div class="container">
            <div onClick={changeLocation} class="button" id='home'>
                <a>Strona główna</a>
            </div>
            <div onClick={changeLocation} class="button" id='stats'>
                <a>Statystyki</a>
            </div>
            <div onClick={changeLocation} class="button" id='pogoda'>
                <a>Pogoda</a>
            </div>
            <div onClick={changeLocation} class="button" id='about'>
               <a>O autorach!</a> 
            </div>
            <div onClick={changeLocation} class="button" id='dupa'>
               <a>O autorach!</a> 
            </div>
        </div>
        <Router>
          <Switch >

          <Route path="/about" component={About} />

          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />


          </Switch>
        </Router>
    </div>

  );
}

export default Nav;
