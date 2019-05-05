import React, { Component } from 'react';
import axios from 'axios';

import './scss/main.scss';

import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      limitend: 20,
      AsyncComponent: null,
      limit: 9,
      results: 9,
      loader: 'block',
      unrenderedQuotes: []
    };

    window.onscroll = () => {
      const {
        loadMore
      } = this;
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
      ) {
        loadMore();
      }
    }
  }

  componentDidMount() {
    axios.get('https://polar-shelf-78995.herokuapp.com/', { headers: {
      "limitend": this.state.limitend
      }
    })
    .then(res => {
      const { quotes } = res.data;
      const renderedQuotes = quotes.filter(quote =>  quotes.indexOf(quote) <= this.state.limit);
      const unrenderedQuotes = quotes.filter(quote => quotes.indexOf(quote) > this.state.limit);
      this.setState(prevState => {
        return {
          quotes: [...prevState.quotes, ...renderedQuotes],
          unrenderedQuotes
        }
      }, () => {
        this.importAsyncComponent()
      })
    })
  .catch(err => {
    console.log(err)
    })
  }

  loadMore = () => {
    if (this.state.quotes.length >= 80) {
      return this.setState(prevState => {
        return {
          quotes: [...prevState.quotes, ...prevState.unrenderedQuotes],
          unrenderedQuotes: [],
          loader: 'none'
        }
      });
    }

    if (this.state.limit <= 9) {
      return this.setState(prevState => {
        return {
          limit: 10,
          quotes: [...prevState.quotes, ...prevState.unrenderedQuotes],
          unrenderedQuotes: []
        }
      })
    }

    if (this.state.limit > 9) {
      return this.setState(prevState => {
        return {
          limit: 9,
          limitend: prevState.limitend+20
        }
      }, () => {
        axios.get('https://polar-shelf-78995.herokuapp.com/', { headers: {
            "limitend": this.state.limitend
          }
        }).then(res => {
          //console.log(res.data.quotes)
          const { quotes } = res.data;
          const renderedQuotes = quotes.filter(quote =>  quotes.indexOf(quote) <= this.state.limit);
          const unrenderedQuotes = quotes.filter(quote => quotes.indexOf(quote) > this.state.limit);
          //console.log(renderedQuotes)
          this.setState(prevState => {
            return {
              quotes: [...prevState.quotes, ...renderedQuotes],
              unrenderedQuotes
            }
          })
        })
      });
    }
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
          quotes: this.state.quotes,
          results: this.state.results
        }) }
        <div className="loader" style={{display: this.state.loader}}><div className="loader--animation"></div></div>
      </div>
    )
  }
}

export default App;
