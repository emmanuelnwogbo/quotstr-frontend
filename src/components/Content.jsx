import React, { Component } from 'react';

import '../scss/components/content.scss'

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: null,
      AsyncComponent: null,
      quoteComponent: null
    }
  }

  componentDidMount() {
    if (this.props.componentOptions.quotes) {
      const { quotes } = this.props.componentOptions
      this.setState({ quotes }, () => {
        this.importAsyncComponent()
      })
    }
  }

  importAsyncComponent = () => {
    import('./AsyncComponent')
      .then(component => {
        const AsyncComponent = component.default;
        this.setState({ AsyncComponent }, 
          () => this.setState({ quoteComponent: this.importQuoteComponent('Quote') }));
      })
  }

  importQuoteComponent = (quote) => {
    if (this.state.AsyncComponent !== null) {
      const quoteComponent = this.state.AsyncComponent(() => import(`./${quote}`))
      return quoteComponent;
    }
  }

  renderQuote = (quote) => {
    const QuoteComponent = this.state.quoteComponent;
    return QuoteComponent ? <QuoteComponent quote={quote} key={quote.id}/> : null;
  }

  renderQuotes = () => {
    if (this.state.quotes !== null && this.state.quoteComponent !== null) {
      return this.state.quotes.map(quote => {
        return this.renderQuote(quote);
      })
    }
    return;
  }

  render() {
    return (
      <div className="content">
        { this.renderQuotes() }
      </div>
    )
  }
}

export default Content;  