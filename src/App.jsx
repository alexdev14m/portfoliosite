import React, { useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Projects from './Projects'
import Contacts from './Contacts';
import './style.css';
import './mstyle.css';

function App() {
  const bodyRef = useRef(document.body);
  const headerRef = useRef(null);
  const headTextRef = useRef([]);
  const titleRef = useRef(null);
  const pTitleRef = useRef([]);
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
    const title = titleRef.current;

    body.classList.remove('light-mode', 'dark-mode');
    header.classList.remove('l-mode-header', 'd-mode-header');
    headTextRef.current.forEach(el => {
      if (!el) return;
      el.classList.remove('l-mode-headText', 'd-mode-headText')
    });
    switchBtn.classList.remove('l-mode-headText', 'd-mode-headText');
    if (title){
      title.classList.remove('l-mode-title', 'd-mode-title');
    }
    pTitleRef.current.forEach(el => {
      if (!el) return;
      el.classList.remove('l-p-title', 'd-p-title');
    });


    if (isLight){
      body.classList.add('light-mode');
      header.classList.add('l-mode-header');
      headTextRef.current.forEach(el => {
        if (!el) return;
        el.classList.add('l-mode-headText')
      });
      switchBtn.innerText = "☀︎";
      switchBtn.classList.add('l-mode-headText');
      title.classList.add('l-mode-title');
      pTitleRef.current.forEach(el => {
        if (!el) return;
        el.classList.add('l-p-title');
      });
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
      title.classList.add('d-mode-title');
      pTitleRef.current.forEach(el => {
        if (!el) return;
        el.classList.add('d-p-title');
      });
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
            <div className="home-page">
              <div className="main">
                <h1 className="title" ref={titleRef}>Welcome to my Portfolio website!</h1>
                <h2 className="p-title" ref={(el) => (pTitleRef.current[0] = el)}>As you might have noticed the website is hosted on Github Pages.</h2>
                <h3 className="p-title" ref={(el) => (pTitleRef.current[1] = el)}>This site will be used for documenting all of my Projects.
                  The site is still under construction and you have to wait until I finish the main design :)
                </h3>
              </div>
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
