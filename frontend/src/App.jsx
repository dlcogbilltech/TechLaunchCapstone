import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Header from './components/Header';
import Welcome from './pages/Welcome';
import ContentList from './pages/ContentList';
import ViewContent from './pages/ViewContent';
import RegLog from './pages/RegLog';

function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <div className="pageBody">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/contents" element={<ContentList />} />
          <Route path="/contents/:id" element={<ViewContent />} />
          <Route path="/reglog" element={<RegLog setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
