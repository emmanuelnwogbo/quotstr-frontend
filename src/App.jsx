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
      unrenderedQuotes: [],
      scrolling: false
    };

    window.addEventListener('scroll',this.handleScroll);
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

  handleScroll = (e) => {
    const { scrolling, limitend } = this.state;
    if (scrolling) return;

    const lastQuote = document.querySelector('div.content > div.quote:last-child');
    const lastQuoteOffset = lastQuote.offsetTop + lastQuote.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 20;


    if (pageOffset > lastQuoteOffset - bottomOffset && this.state.unrenderedQuotes.length !== 0) {
      return this.setState(prevState => ({
        quotes: [...prevState.quotes, ...prevState.unrenderedQuotes],  
        unrenderedQuotes: []  
      }))
    }

    if (pageOffset > lastQuoteOffset - bottomOffset && limitend >= 100) {
      //console.log(this.state.quotes.length);
      return this.setState({ loader: 'none' })
    }

    if (pageOffset > lastQuoteOffset - bottomOffset && this.state.unrenderedQuotes.length === 0) {
      return this.setState(prevState => ({
        limitend: prevState.limitend+20
      }), () => {
        this.loadMore();
      })
    }
  }

  loadMore() {
    axios.get('https://polar-shelf-78995.herokuapp.com/', {
      headers: {
        "limitend": this.state.limitend
      }
    }).then(res => {
      const { quotes } = res.data;
      const renderedQuotes = quotes.filter(quote =>  quotes.indexOf(quote) <= this.state.limit);
      const unrenderedQuotes = quotes.filter(quote => quotes.indexOf(quote) > this.state.limit);
      this.setState(prevState => ({
        quotes: [...prevState.quotes, ...renderedQuotes],
        unrenderedQuotes
      }))
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
          quotes: this.state.quotes,
          results: this.state.results
        }) }
        <div className="loader" style={{display: this.state.loader}}><div className="loader--animation"></div></div>
      </div>
    )
  }
}

export default App;
