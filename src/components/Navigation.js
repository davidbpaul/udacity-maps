import React, { Component } from 'react';

import '../css/Navigation.css';
// bootstrap
import {Navbar, Glyphicon} from 'react-bootstrap';


class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
        <Navbar className="navBar">
          <Navbar.Header className="navBarHeader">
            <Navbar.Brand>
               <Glyphicon onClick={this.props.handleToggle} glyph="align-justify"/>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;
