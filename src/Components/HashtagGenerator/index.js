import React, { Component } from 'react';
import { FormGroup, Input, Button, InputGroup  } from 'reactstrap'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

import HomeworkHashtagForm from './HomeworkHashtagForm'
import HashtagTypeDropdown from './HashtagTypeDropdown'

class HashtagGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form_type: 'hw'
    }
  }

  changeForm = (form_type) => {
    this.setState({
      form_type
    })
  }

  render() {
    return (
      <div>
        <h1 className="text-spacing text-center">Hashtag Generator</h1>
        {/*
        <div className="text-center">
          <HashtagTypeDropdown changeForm={this.changeForm} />
        </div>

        { this.state.form_type === 'hw' ? <HomeworkHashtagForm /> : '' }
        */}
        <HomeworkHashtagForm />
      </div>
    )
  }
}

export default HashtagGenerator;