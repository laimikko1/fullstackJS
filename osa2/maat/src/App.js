import React from 'react';
import Countries from './components/countries'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }


  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  filterCountries = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <div>
          find countries: <input
            value={this.state.filter}
            onChange={this.filterCountries}
          />
        </div>
        <div>
          <Countries key={this.state.countries.length} countries={this.state.countries} filter={this.state.filter} />
        </div>
      </div>
    )
  }

}
export default App;
