axios.get("https://polar-shelf-78995.herokuapp.com/").then(res => {
  console.log(res);
}).catch(err => {
  console.log(err)
})


const playFun = () => {
  this.setState(prevState => {
    return {
      limitstart: prevState.limitend+1,
      limitend: prevState.limitend+7
    }
  }, () => {
    axios.get("http://localhost:3000/", { headers: {
        "limitstart": this.state.limitstart,
        "limitend": this.state.limitend
      }
    }).then(res => {
      this.setState(prevState => {
        return {
          quotes: [...prevState.quotes, ...res.data.quotes]
        }
      })
    })
  })
}

/*
<svg>
  <use xlinkHref="./img/sprite.svg#icon-pause" />
</svg>
*/