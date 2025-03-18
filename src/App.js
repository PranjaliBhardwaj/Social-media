import React from 'react';
import Form from './components/Form.js';
import './index.css';
import logo from './Logo_dark.png';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" className="App-logo" /> {}
      <Form />
      <Footer />
    </div>
  );
}
export default App;
