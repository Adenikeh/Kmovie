// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddMovie from './components/addmovie/AddMovie';
import Home from './components/home/Home';
import AppNavBar from './components/navigation/AppNavBar';
import MovieDetail from './components/detail/MovieDetail';
import EditMovie from './components/editmovie/EditMovie';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavBar />
        <div className="container mx-auto mt-4">
          <div className="mx-auto px-4 py-3 ">
            {/* <Routes>
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/" element={<Home />} />
              <Route path="/movie-detail/" element={<></>} />
              <Route path="/edit-movie/" element={<></>} />
            </Routes> */}

            <Routes>
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/" element={<Home />} />
              <Route path="/movie-detail/:id" element={<MovieDetail />} />
              <Route path="/edit-movie/:id" element={<EditMovie />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
