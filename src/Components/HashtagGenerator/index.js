import React, { Component } from 'react';
import { FormGroup, Input, Button, InputGroup  } from 'reactstrap'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

class HashtagGenerator extends Component {
  generateHashtag = () => {
    let generate = () => {
      if (!this.state || !this.state.class || !this.state.session || !this.state.deadline) {
        return null;
      }

      return `#tk_hw_${this.state.class}_${this.state.session} #tk_deadline_${this.state.deadline.unix()}`
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
        <h1 className="text-spacing text-center">Hashtag Generator</h1>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <FormGroup>
              <label className="input-title">Class</label>
              <Input placeholder="C4E69" name="class" onChange={this.updateInputValue}/>
            </FormGroup>
            <FormGroup>
              <label className="input-title">Session</label>
              <Input type="number" placeholder="1" name="session" onChange={this.updateInputValue}/>
            </FormGroup>
            <FormGroup>
              <label className="input-title">Deadline</label>
              <Datetime onChange={this.updateDeadline} />
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

export default HashtagGenerator;