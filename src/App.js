import React from 'react';
import Search from './pages/Search';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <aside>
        <ul className="navigation">
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/nearby">Nearby</Link>
          </li>
          <li>
            <Link to="/predict-price">Predict Price</Link>
          </li>
          <li>
            <Link to="/predict-property-type">Predict Property Type</Link>
          </li>
        </ul>
      </aside>
      <main>
        <Route path="/search" component={Search} />
        <Route path="/nearby" component={FourZeroFour} />
        <Route path="/predict-price" component={FourZeroFour} />
        <Route path="/predict-property-type" component={FourZeroFour} />
      </main>
    </BrowserRouter>
  );
}

const FourZeroFour = () => {
  return <h1>404</h1>
}

export default App;
