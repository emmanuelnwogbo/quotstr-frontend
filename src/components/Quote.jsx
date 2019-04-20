import React from 'react';

class Quote extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      loaded: false,
      returnContent: false,
      url: "./img/Webp.net-compress-image.jpg"
    };
    this.returnTags = this.returnTags.bind(this);
    this.lazyLoadQuote = this.lazyLoadQuote.bind(this);
    this.returnSelf = this.returnSelf.bind(this)
  }

  lazyLoadQuote() {
    const img = new Image();
    img.src = `${this.state.url}`
    img.onload = () => {
      this.setState(prevState => {
        return {
          loaded: true
        }
      })
    }
  }

  returnSelf(id, author, tags, text) {
    if (this.state.loaded) {
      return (
        <div className="quote" id={`${id}`}>
          <figure className="quote__figure">
            <img className="quote__img" src="./img/Webp.net-compress-image.jpg"/>
          </figure>
          <div className="quote__content">
            <div className="quote__text">
              <p className="quote__text--para">{text}</p>
            </div>
            <p className="quote__ellipsis">Read More...</p>
            <div className="quote__author">
              <span className="quote__author--name"><p>{author}</p></span>
            </div>
            <div className="quote__tags">
              {this.returnTags(tags)}
            </div>
          </div>
        </div>
      )
    }
  }

  returnTags(string) {
    const array = string.split(',');
    return array.map(item => {
      if (item) {
        return (
          <span key={array.indexOf(item)} className="quote__tags--tag"><p>{item}</p></span>
        )
      }
      return;
    })
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        returnContent: this.returnSelf
      }
    })
  }

  render() {
    this.lazyLoadQuote()
    let { id, author, tags, text } = this.props;
    if (this.state.loaded && this.state.returnContent) {
      return this.state.returnContent(id, author, tags, text)
    }
    return (
      <div className="placeholder">
      </div>
    );
  }
}

export default Quote;
