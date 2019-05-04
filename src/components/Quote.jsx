import React, { Component } from 'react';

import '../scss/components/quote.scss';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  returnTags = (string) => {
    const array = string.split(',');
    return array.map(item => {
      if (item) {
        return (
          <span key={array.indexOf(item)} className="quote--tag">{item}</span>
        )
      }
      return;
    })
  }

  render() {
    const { quote } = this.props;
    return (
      <div className="quote" id={`${quote.id}`}>
        <div className="quote--container">
          <div className="quote--photoarea">
            <figure className="quote--figure">
              <img className="quote--img" src="./img/jk_rowling--small.jpg"/>
            </figure>
          </div>
          <div className="quote--content">
            <h2 className="quote--h2">
              <p className="quote--author">{quote.Author}</p>
            </h2>
            <p className="quote--text">
              {quote.Text}
            </p>
            <div className="quote--tags">
              {this.returnTags(quote.Tags)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quote;