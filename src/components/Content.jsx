import React from "react";
import axios from 'axios';

import Quote from './Quote';
import Placeholder from './Placeholder';

class Content extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      quotes: [],
      loader: false,
      limitstart: 0,
      limitend: 7,
      lastquotegotten: false
    };
    this.returnQuotes = this.returnQuotes.bind(this);
  }

  returnQuotes() {
    if (this.state.quotes.length > 0) {
      return this.state.quotes.map(({ id, Author, Tags, Text }) => {
        return <Quote id={id} key={id} author={Author} tags={Tags} text={Text}/>
      })
    }
    return [1, 2, 3, 4, 5, 6, 8, 9, 10, 11].map(num => {
      return <Placeholder key={num}/>
    })
  }

  componentDidMount() {
    axios.get("https://polar-shelf-78995.herokuapp.com/", { headers: {
        "limitstart": this.state.limitstart,
        "limitend": this.state.limitend
      }
    }).then(res => {
      this.setState(prevState => {
        return {
          quotes: res.data.quotes,
          loader: document.getElementById('loader--animation')
        }
      }, () => {
        window.onscroll = () => {
          if (
          this.state.loader.getBoundingClientRect().bottom < 1000
          ) {
            console.log('hello there get more data pls')
            this.setState(prevState => {
              return {
                limitstart: prevState.limitend+1,
                limitend: prevState.limitend+7
              }
            }, () => {
              axios.get("https://polar-shelf-78995.herokuapp.com/", { headers: {
                  "limitstart": this.state.limitstart,
                  "limitend": this.state.limitend
                }
              }).then(res => {
                this.setState({
                  quotes: [
                    ...this.state.quotes,
                    ...res.data.quotes
                  ]
                }, () => {
                  if (this.state.quotes.length > 99) {
                    this.state.loader.style.display = `none`
                    //hello to the test
                  }
                })
              })
            })
          }
        };
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
