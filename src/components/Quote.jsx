import React from 'react';

class Quote extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {};
    this.returnTags = this.returnTags.bind(this);
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

  render() {
    let { id, author, tags, text } = this.props;
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

export default Quote;
