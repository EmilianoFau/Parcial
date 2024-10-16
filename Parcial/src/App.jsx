import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Details from './components/Details/details';
import { DishesProvider } from './contexts/dishes';
import { ThemeProvider } from './contexts/theme';

function App() {
  return (
    <ThemeProvider>
      <DishesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dishes/:id" element={<Details />} />
          </Routes>
        </Router>
      </DishesProvider>
    </ ThemeProvider>
  )
}

export default App;
