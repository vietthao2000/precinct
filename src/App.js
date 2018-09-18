import React, { Component } from 'react';
import './App.css';

import SubmissionStatusPage from './Components/SubmissionStatusPage';
import HashtagGenerator from './Components/HashtagGenerator';
import NavBar from './Components/NavBar';

import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <div>
            
            <Container>
              <div id="main">

                <Switch>
                  <Route exact path="/" component={SubmissionStatusPage} />
                  <Route path="/hashtag" component={HashtagGenerator} />
                </Switch>
              </div>
            </Container>
          </div>          
        </Router>
      </div>
    );
  }
}

export default App;
