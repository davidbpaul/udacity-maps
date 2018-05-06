import React, { Component } from 'react';
import '../css/SearchBar.css';
// bootstrap
import {ControlLabel, Form, FormGroup, ListGroup, ListGroupItem, FormControl, Button} from 'react-bootstrap';
class App extends Component {
  state = {
    query: ''
  }

  componentWillMount() {
    this.props.getSearch(this.state.query);
  }
  getInput = (e) => {
    this.setState({ query: e.target.value})
  }
  placeSearch = (e) => {
    this.props.getSearch(this.state.query , e);
  }
  menuClick = (e) =>{
    this.props.setMenu(e.target.value);
  }

  render() {
    const places = this.props.filtered;
    return (
      <div className="SearchBar">
        {/* Search */}
        <Form id="filterForm" inline onSubmit={ this.placeSearch }>
          <FormControl
            tabIndex="2"
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
          <div className="ListOuter">
            <h3>Search returned { places.length } schools </h3>
            <ListGroup id="list">
              {places.map((item, i) => (
                <ListGroupItem aria-label={item.name} tabIndex={i + 3} active={item.name === this.props.menuItem} value={item.name} onClick={this.menuClick} key={i}>{item.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        )}
        { places.length < 1 && (
          <div>
            <h4>No school Found. Please try again!</h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;
