import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Ensure this is imported for the styles to apply
import PersistentDrawerLeft from './SideBar'; // Import the PersistentDrawerLeft component
import Home from './Home';
import About from './About';
import CSVViewer from './Bhajans';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { store } from './store';

function App() {
  return (
    
    <Router>
      <div className="App">
        <PersistentDrawerLeft />
        <nav>
          {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/csv-viewer">CSV Viewer</Link></li>
          </ul> */}
        </nav>
        <Routes>
          <Route path="/" element={<CSVViewer />} />
          <Route path="/about" element={<About />} />
          <Route path="/csv-viewer" element={<CSVViewer />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;


