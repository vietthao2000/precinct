import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash';

class ClassesDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownItems: [
        {name: 'Homework', value: 'hw'},
        {name: 'Git Submit', value: 'git'}
      ],
      current_form: 'Homework'
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeForm = (e) => {
    this.setState({
      current_form: e.currentTarget.dataset.name
    })

    this.props.changeForm(e.currentTarget.dataset.value)
  }

  render() {
    const dropdownElem = this.state.dropdownItems.map(item => 
      <DropdownItem key={ item.value } data-name={ item.name } data-value={ item.value } onClick={ this.changeForm }>{ item.name }</DropdownItem>
    )

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.current_form}
        </DropdownToggle>
        <DropdownMenu>
          { dropdownElem }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ClassesDropdown