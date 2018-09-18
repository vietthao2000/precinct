import React, { Component } from 'react';
import { FormGroup, Input, Button, InputGroup  } from 'reactstrap'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

class HomeworkHashtagForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: 'C4E69',
      session: 1
    }
  }

  generateHashtag = () => {
    let generate = () => {
      if (!this.state || !this.state.class || !this.state.session || !this.state.deadline) {
        return null;
      }

      return `#tk_hw_${this.state.class}_${this.state.session} #tk_hw_deadline_${this.state.deadline.unix()}`.toLowerCase()
    }

    this.setState({
      hashtag: generate()
    })
  }

  updateInputValue = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value.toLowerCase()
    })
  }

  updateDeadline = (deadline) => {
    this.setState({
      deadline
    })
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    let hashtag = (() => {
      if (this.state && this.state.hashtag)
        return (
          <InputGroup>
            <Input readOnly value={this.state.hashtag} />
            <Button onClick={this.copyToClipboard(this.state.hashtag)}>Copy</Button>
          </InputGroup>
        )

      return ''
    })()

    return (
      <div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <FormGroup>
              <label className="input-title">Class</label>
              <Input placeholder={this.state.class} name="class" onChange={this.updateInputValue}/>
            </FormGroup>
            <FormGroup>
              <label className="input-title">Session</label>
              <Input type="number" placeholder={this.state.session} name="session" onChange={this.updateInputValue}/>
            </FormGroup>
            <FormGroup>
              <label className="input-title">Deadline</label>
              <Datetime onChange={this.updateDeadline} />
            </FormGroup>
            <FormGroup>
              <div className="text-center">
                { this.state.deadline ? this.state.deadline.fromNow() : '' }
              </div>
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="button" color="primary" onClick={this.generateHashtag}>Generate</Button>
            </FormGroup>
            <FormGroup className="text-center">
              { hashtag }
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeworkHashtagForm;