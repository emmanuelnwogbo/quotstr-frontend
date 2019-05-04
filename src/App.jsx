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
      quotesLength: null
    };

    window.onscroll = () => {
      const {
        loadMore
      } = this;
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
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
      console.log(res.data.quotes)
      const { quotes } = res.data;
      const quotesLength = quotes.length;
      this.setState(prevState => {
        return {
          quotes: [...prevState.quotes, ...quotes],
          quotesLength
        }
      }, () => {
        console.log(this.state)
        this.importAsyncComponent()
      })
    })
  .catch(err => {
    console.log(err)
    })
  }

  loadMore = () => {
    if (this.state.limit < this.state.quotesLength && this.state.quotes.length < 120) {
      return this.setState(prevState => {
        return {
          limit: prevState.limit + 10,
          results: prevState.results + 10
        }
      })
    }
    else if (this.state.limit >= this.state.quotesLength && this.state.quotes.length < 120) {
      return this.setState(prevState => {
        return {
          limit: 0,
          limitend: prevState.limitend + 20
        }
      }, () => {
        axios.get('https://polar-shelf-78995.herokuapp.com/', { headers: {
          "limitend": this.state.limitend
          }
        })
        .then(res => {
          console.log(res)
          const { quotes } = res.data;
          const quotesLength = quotes.length;
          this.setState(prevState => {
            return {
              quotes: [...prevState.quotes, ...quotes],
              quotesLength
            }
          }, () => {
            console.log(this.state)
          })
        })
      })
    }
    else {
      return console.log('all quotes gotten')
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
      </div>
    )
  }
}

export default App;
