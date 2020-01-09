import React from 'react';
import './about.css';
import Authors from './authors/authors';
const About = ()=> {
  return (
    <div className="App">
      <header className="App-header">
        <Authors />
      </header>
    </div>
  );
}

export default About;
