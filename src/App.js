import React, { Component } from 'react';
import './App.css';

import SubmissionStatusPage from './Components/SubmissionStatusPage';
import HashtagGenerator from './Components/HashtagGenerator';
import NavBar from './Components/NavBar';

import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          
          <Container>
            <div id="main">

              <Route exact path="/" component={SubmissionStatusPage} />
              <Route path="/hashtag" component={HashtagGenerator} />
            </div>
          </Container>
        </div>          
      </Router>
    );
  }
}

export default App;
