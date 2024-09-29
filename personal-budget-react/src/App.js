import React from 'react';
import './App.css';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import ChartComponent from './Charts/ChartComponent';
import D3ChartComponent from './Charts/D3ChartComponent';



function App() {
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className='mainContainer'>
        <Switch>
          <Route path="/about">
              <AboutPage/>
          </Route>
          <Route path="/login">
              <LoginPage/>
          </Route>
          <Route path="/">
              <HomePage/>
          </Route>
        </Switch>
      </div>
      <ChartComponent/>
      <D3ChartComponent/>

      <Footer/>
    </Router>
  );
}

export default App;
