import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash';

class ClassesDropdown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      group: this.props.current_group
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue = (e) => {
    this.props.changeGroup(e.currentTarget.dataset.group_id)
    this.setState({
      group: this.props.groups[e.currentTarget.dataset.group_id]
    })
  }

  render() {
    const dropdownElem = _.values(this.props.groups).map(group =>
      <DropdownItem key={ group.id } onClick={ this.changeValue } data-group_id={ group.id }>{ group.name }</DropdownItem>
    )

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.group.name}
        </DropdownToggle>
        <DropdownMenu>
          { dropdownElem }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default ClassesDropdown