import React, { Component } from 'react';
import '../css/SearchBar.css';
// bootstrap
import {ControlLabel, Form, FormGroup, ListGroup, ListGroupItem, FormControl, Button} from 'react-bootstrap';
class App extends Component {
  state = {
    query: '',
    places: this.props.getLocations(),
    filtered:[],
  }

  componentWillMount() {
    this.getSearch();
  }
  getInput = (e) => {
    this.setState({ query: e.target.value})
  }
  getSearch = (e=false) => {

    const filtered = this.state.places.filter(item => item.name.match(this.state.query));
    if(this.state.query == ""){
      this.setState({filtered: this.state.places});
    }else{
      this.setState({filtered: filtered});
    }
    if(e){
      this.props.getPlaces(this.state.filtered);
      e.preventDefault();
    }
  }
  render() {
    const places = this.state.filtered;
    return (
      <div className="SearchBar">
        {/* Search */}
        <Form id="filterForm" inline onSubmit={ this.getSearch }>
          <FormControl
            id="search"
            type="text"
            placeholder="Search by title or author"
            onInput={ this.getInput}
            value={ this.state.query }
          />
          <Button id="submit" type="submit">Filter</Button>
        </Form>
        {/* Results */}
        { places.length >= 1 && (
          <div>
            <h3>Search returned { places.length } books </h3>
            <ListGroup>
              {places.map((item, i) => (
                <ListGroupItem key={i}>{item.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
        { places.length < 1 && (
          <div>
            <h4>No Books Found. Please try again!</h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;
