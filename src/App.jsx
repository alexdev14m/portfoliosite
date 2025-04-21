import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Projects from './Projects'
import Contacts from './Contacts';
import './style.css';

function App() {
  const bodyRef = useRef(document.body);
  const headerRef = useRef(null);
  const headTextRef = useRef([]);
  const switchBtnRef = useRef(null);

  useEffect(() =>{
    const saved = localStorage.getItem('theme');
    switchT(saved !== 'dark');
  }, []);
  
  const switchT = useCallback((toLight) => {
    const isLight = toLight ?? bodyRef.current.classList.contains('dark-mode');
    const body = bodyRef.current;
    const header = headerRef.current;
    const switchBtn = switchBtnRef.current;

    body.classList.remove('light-mode', 'dark-mode');
    header.classList.remove('l-mode-header', 'd-mode-header');
    headTextRef.current.forEach(el => {
      if (!el) return;
      el.classList.remove('l-mode-headText', 'd-mode-headText')
    });
    switchBtn.classList.remove('l-mode-headText', 'd-mode-headText');

    if (isLight){
      body.classList.add('light-mode');
      header.classList.add('l-mode-header');
      headTextRef.current.forEach(el => {
        if (!el) return;
        el.classList.add('l-mode-headText')
      });
      switchBtn.innerText = "☀︎";
      switchBtn.classList.add('l-mode-headText');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-mode');
      header.classList.add('d-mode-header');
      headTextRef.current.forEach(el => {
        if (!el) return;
        el.classList.add('d-mode-headText');
      });
      switchBtn.classList.add('d-mode-headText');
      switchBtn.innerText  = "⏾";
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
  <>
    <Router>
      <header className="header" ref={headerRef}>
        <div className="container">
          <ul className="header-list">
            <li className="header-li">
              <Link className="headText" to="/" ref={(el) => (headTextRef.current[0] = el)}>Home</Link>
            </li>
            <li className="header-li">
              <Link className="headText" to="/about" ref={(el) => (headTextRef.current[1] = el)}>About Me</Link>
            </li>
            <li className="header-li">
              <Link className="headText" to="/projects" ref={(el) => (headTextRef.current[2] = el)}>My Projects</Link>
            </li>
            <li className="header-li">
              <Link className="headText" to="/contacts" ref={(el => (headTextRef.current[3] = el))}>My Contacts</Link>
            </li>
            <li className="header-li">
              <button onClick={() => switchT()} className="headText theme-switch" ref={switchBtnRef}>
                ☼
              </button>
            </li>
          </ul>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
            <div className="main">
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pellentesque feugiat nisi dapibus dapibus. Morbi nulla purus, ornare at urna ac, auctor tristique mauris. Donec vitae luctus metus. Vivamus rhoncus libero id dolor facilisis, eget pulvinar massa posuere. Curabitur in bibendum leo. Integer gravida diam nibh, nec dignissim erat pulvinar sit amet. Etiam hendrerit molestie cursus. Mauris ac tortor malesuada, hendrerit erat nec, placerat massa. Vivamus facilisis luctus dui, in vehicula quam maximus non. In iaculis felis neque, ac porttitor felis vulputate consectetur.</h1>
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
   </Router>
  </>
  );
}
export default App;
