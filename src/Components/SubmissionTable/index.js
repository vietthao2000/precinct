import React, { Component } from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';

class SubmissionTable extends Component {
  render() {
    const hw_posts = _.values(this.props.hw_posts).sort((a, b) => a.session - b.session)

    const sessionElem = hw_posts.map(post => 
      <th scope="col" key={ post.id }>{ post.session }</th>
    )
    
    const students = _.uniqBy(
      this.props.students.map(student => {
        return {
          name: student.name,
          id: student.id
        }
      }
    ), student => student.id).sort((a, b) => a.id - b.id)

    let submissionElem = (student_id) => 
      hw_posts
        .map(post => post.submitted[student_id])
        .map((submission, index) => 
          <td key={ index }>{ submission ? 'X' : '' }</td>
        )

    const submissionRow = students.map((student, index) => 
      <tr key={ index }>
        <td>{ student.name }</td>
        { submissionElem(student.id) }
      </tr>
    )
    return (
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th scope="col">Session</th>
            { sessionElem }
          </tr>
        </thead>
        <tbody>
          { submissionRow }
        </tbody>
      </Table>
    );
  }
}

export default SubmissionTable