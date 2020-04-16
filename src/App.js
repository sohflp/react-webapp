import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      artistID: '',
      artistName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();

    fetch('https://j227auhp18.execute-api.ap-southeast-2.amazonaws.com/beta/GetArtists?artist=' + this.state.artistID,{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      //body: JSON.stringify({ artist: this.state.artistID })
    })
      .then(res => res.json())
      .then(json => {

        let result = "";

        switch (json.statusCode) {
          case 200:
            result = json.body.Items[0].ArtistName;
            break;
          
          case 400:
              result = json.body;
            break;

          default:
            result = "Error with artists search"
            break;

        }

        this.setState({
          artistName: result
        });
      });
  }

  handleChange(evt){
    this.setState({
      artistID: evt.target.value
    });
  }

  render() {
    const { artistName } = this.state;
    const searchResult = <h1>{ artistName }</h1>;

    return (
      <center>
        <div className="App">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" onChange={ this.handleChange }></input>
            <button>Find Your Artist</button>
          </form>
          { searchResult }
        </div>      
      </center>
    );
  }
}

export default App;
