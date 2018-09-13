import React, { Component } from 'react';
import './App.css';
import StudentTable from './Components/StudentTable';
import SubmissionTable from './Components/SubmissionTable';
import ClassesDropdown from './Components/ClassesDropdown';
import _ from 'lodash';
import { Container } from 'reactstrap';
import { firestore } from './Firebase.js';
import moment from 'moment';

let dummy_data = {
  "2122371191315169":{
    "id":"2122371191315169",
    "name":"C4E Test 1",
    "hw_posts":{
      "2122371191315169_2124476881104600":{
        "last_update":1536347868,
        "id":"2122371191315169_2124476881104600",
        "created_time":"2018-08-27T11:14:21+0000",
        "class":"c4e69",
        "session":"3",
        "submitted":{
          "100005423654474":{
            "name":"Minh \u0110\u1ee9c",
            "id":"100005423654474"
          },
          "100009563844355":{
            "id":"100009563844355",
            "name":"Vi\u1ec7t Th\u1ea3o"
          }
        }
      },
      "2122371191315169_2124474341104854":{
        "last_update":1536347869,
        "id":"2122371191315169_2124474341104854",
        "created_time":"2018-08-27T11:08:54+0000",
        "class":"c4e69",
        "session":"1",
        "submitted":{
          "100002805580348":{
            "id":"100002805580348",
            "name":"Huy Nguyen Quang"
          },
          "100005423654474":{
            "name":"Minh \u0110\u1ee9c",
            "id":"100005423654474"
          },
          "100003133200398":{
            "id":"100003133200398",
            "name":"Nguy\u1ec5n Anh Qu\u00e2n"
          }
        }
      },
      "2122371191315169_2124474741104814":{
        "last_update":1536347868,
        "id":"2122371191315169_2124474741104814",
        "created_time":"2018-08-27T11:10:06+0000",
        "class":"c4e69",
        "session":"2",
        "submitted":{
          "100005423654474":{
            "id":"100005423654474",
            "name":"Minh \u0110\u1ee9c"
          },
          "100009563844355":{
            "name":"Vi\u1ec7t Th\u1ea3o",
            "id":"100009563844355"
          }
        }
      }
    },
    "git_post":{
      "last_update":1536347868,
      "id":"2122371191315169_2124380634447558",
      "created_time":"2018-08-27T06:46:37+0000"
    },
    "students":[
      {
        "repo_url":"https://github.com/minhduc9699/code4teen",
        "name":"Minh \u0110\u1ee9c",
        "id":"100005423654474",
        "repo_id":144312521
      },
      {
        "repo_url":"https://github.com/vietthao2000/c4e_test_1",
        "id":"100009563844355",
        "name":"Vi\u1ec7t Th\u1ea3o",
        "repo_id":146261407
      },
      {
        "repo_url":"invalid",
        "id":"100002805580348",
        "name":"Huy Nguyen Quang",
        "repo_id":"invalid"
      },
      {
        "repo_url":"https://github.com/qhuydtvt/ci9",
        "id":"100005423654474",
        "name":"Minh \u0110\u1ee9c",
        "repo_id":144565868
      },
      {
        "repo_url":"https://github.com/qhuydtvt/ci9",
        "name":"Ph\u1ea1m Q\u00fay \u0110\u00f4nn",
        "id":"100003976483027",
        "repo_id":144565868
      },
      {
        "repo_url":"https://github.com/qhuydtvt/ci9",
        "id":"100003976483027",
        "name":"Ph\u1ea1m Q\u00fay \u0110\u00f4nn",
        "repo_id":144565868
      },
      {
        "repo_url":"https://github.com/qhuydtvt/ci9",
        "id":"100003976483027",
        "name":"Ph\u1ea1m Q\u00fay \u0110\u00f4nn",
        "repo_id":144565868
      },
      {
        "repo_url":"https://github.com/donezombie/tower_defense",
        "name":"Ph\u1ea1m Q\u00fay \u0110\u00f4nn",
        "id":"100003976483027",
        "repo_id":140955112
      },
      {
        "repo_url":"https://github.com/huynhtuanhuy/Web4.0",
        "id":"100005897612405",
        "name":"Huy",
        "repo_id":74887188
      },
      {
        "repo_url":"https://github.com/qhuydtvt/ci9",
        "id":"100002805580348",
        "name":"Huy Nguyen Quang",
        "repo_id":144565868
      }
    ]
  }
}

class App extends Component {
  changeGroup = (group_id) => {
    this.setState({group_id})
  }

  componentDidMount() {
    let groups = {}

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
      })

      this.setState({
        groups,
        group_id: _.values(groups)[0].id,
        last_update: last_update
      })
    })
  }

  render() {
    // console.log(firestore)
    if (this.state && this.state.groups && _.values(this.state.groups) && _.values(this.state.groups).length) {
      return (
        <Container id="main">
          <h1 className="text-spacing text-center">Techkids police submission status</h1>
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
        </Container>
      );
    } else {
      return (
        <Container>
        </Container>
      )
    }
  }
}

export default App;
