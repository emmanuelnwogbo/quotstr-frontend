import React, { Component } from 'react';
import axios from 'axios';

import './scss/main.scss';

import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      limitend: 1,
      AsyncComponent: null
    };
  }

  componentDidMount() {
    axios.get('https://polar-shelf-78995.herokuapp.com/', { headers: {
      "limitend": this.state.limitend
      }
    })
    .then(res => {
      console.log(res.data.quotes)
      const { quotes } = res.data;
      this.setState(prevState => {
        return {
          quotes: [...prevState.quotes, ...quotes]
        }
      }, () => {
        this.importAsyncComponent()
      })
    })
  .catch(err => {
    console.log(err)
    })
  }

  importAsyncComponent = () => {
    import('./components/AsyncComponent')
      .then(component => {
        const AsyncComponent = component.default;
        this.setState({ AsyncComponent });
      })
  }

  importComponents = (file, options) => {
    if (this.state.AsyncComponent !== null) {
      const Component = this.state.AsyncComponent(() => import(`./components/${file}`))
      return <Component componentOptions={options}/>;
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        { this.importComponents('Content', {
          quotes: this.state.quotes
        }) }
      </div>
    )
  }
}

export default App;
