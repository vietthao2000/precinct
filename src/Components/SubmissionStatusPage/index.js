import React, { Component } from 'react';
import { firestore } from '../../Firebase.js';
import moment from 'moment';
import _ from 'lodash';

import ClassesDropdown from './ClassesDropdown';
import StudentTable from './StudentTable';
import SubmissionTable from './SubmissionTable';

class SubmissionStatusPage extends Component {
  changeGroup(group_id) {
    this.setState({group_id})
  }

  componentDidMount() {
    firestore.collection('patrol').get().then(snapshot => {
      let raw_groups = []
      snapshot.forEach(doc => raw_groups.push(doc.data()))

      let groups = {}

      raw_groups
        .sort((a, b) => {
          let nameA = a.name.toLowerCase().replace(' ', '')
          let nameB = b.name.toLowerCase().replace(' ', '')
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        })
        .map(group => groups[group.id] = group)

      let groups_arr = _.values(groups)
      var last_update = 0;

      groups_arr.map(group => {
        if (group.git_post) last_update = Math.max(group.git_post.last_update, last_update);
        if (group.hw_posts) {
          _.values(group.hw_posts).map(post => last_update = Math.max(post.last_update, last_update))
        }

        return null;
      })

      if (groups && _.values(groups).length) {
        this.setState({
          groups,
          group_id: _.values(groups)[0].id,
          last_update: last_update
        })
      }
    })
  }

  render() {
    if (this.state && this.state.groups && _.values(this.state.groups) && _.values(this.state.groups).length) {
      return (
        <div>
          <h1 className="text-spacing text-center">Submission status</h1>
          <h2 className="text-center">Last update: { moment.unix(this.state.last_update).fromNow() }</h2>
          <div className="table-spacing text-center">
            <ClassesDropdown groups={ this.state.groups } changeGroup={ this.changeGroup } current_group={ this.state.groups[this.state.group_id] } />
          </div>
          
          <div className="table-spacing">
            <StudentTable students={ this.state.groups[this.state.group_id].students } />
          </div>

          <div className="table-spacing">
            <SubmissionTable { ...this.state.groups[this.state.group_id] } />
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default SubmissionStatusPage;