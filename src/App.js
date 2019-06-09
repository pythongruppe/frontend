import React from 'react';
import Search from './pages/Search';
import Graphs from "./pages/Graphs"
import PredictPrice from "./pages/PredictPrice"
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <aside>
        <ul className="navigation">
        <li>
            <Link to="/graphs">Graphs</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
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
        <Route path="/graphs" component={Graphs} />
        <Route path="/search" component={Search} />
        <Route path="/predict-price" component={PredictPrice} />
        <Route path="/predict-property-type" component={FourZeroFour} />
      </main>
    </BrowserRouter>
  );
}

const FourZeroFour = () => {
  return <h1>404</h1>
}

export default App;
