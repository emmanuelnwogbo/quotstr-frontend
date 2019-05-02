import React from "react";
import axios from 'axios';

const App = () => {
  axios.get('https://polar-shelf-78995.herokuapp.com/', { headers: {
    "limitend": 50
    }
  })
    .then(res => {
      console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
  return (
    <div className="app">
      <p>hello quotes</p>
    </div>
  )
}

export default App;
