import React, { Component } from 'react';
import { Table } from 'reactstrap';

class StudentTable extends Component {
  render() {
    const students = this.props.students.map((student, index) => 
      <tr key={ index }>
        <td>
          <a href={ `https://facebook.com/${student.id}` } target="_blank">
            { `https://facebook.com/${student.id}` }
          </a>
        </td>
        <td>{ student.name }</td>
        <td>
          <a href={ student.repo_url } target="_blank">
            { student.repo_url }
          </a>
        </td>
      </tr>
    )

    return (
      <Table bordered>
        <thead>
          <tr>
            <th scope="col">Facebook URL</th>
            <th scope="col">Name</th>
            <th scope="col">Git repo ID</th>
          </tr>
        </thead>
        <tbody>
          { students }
        </tbody>
      </Table>
    );
  }
}

export default StudentTable