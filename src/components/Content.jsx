import React from "react";
import axios from 'axios';

import Quote from './Quote';

class Content extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      quotes: false
    };
    this.returnQuotes = this.returnQuotes.bind(this);
  }

  returnQuotes() {
    if (this.state.quotes) {
      return this.state.quotes.map(({ id, Author, Tags, Text }) => {
        return <Quote id={id} key={id} author={Author} tags={Tags} text={Text}/>
      })
    }
  }

  componentDidMount() {
    axios.get("https://polar-shelf-78995.herokuapp.com/").then(res => {
      this.setState(prevState => {
        return {
          quotes: res.data.quotes
        }
      }, () => {
        console.log('state', this.state)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="content">
        {this.returnQuotes()}
      </div>
    )
  }
}

export default Content;
