import React from "react";

import Header from './components/Header';
import Content from './components/Content'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content />
      <div className="loader" id="loader">
        <div className="loader--animation" id="loader--animation"></div>
      </div>
    </div>
  )
}

export default App;
