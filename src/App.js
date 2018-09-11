import React, { Component } from 'react';
import './App.css';
import StudentTable from './Components/StudentTable';
import SubmissionTable from './Components/SubmissionTable';
import ClassesDropdown from './Components/ClassesDropdown';
import _ from 'lodash';
import { Container } from 'reactstrap';
import firebase from '@firebase/app';
import '@firebase/firestore'

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

  componentWillMount() {
    const config = {
      "type": "service_account",
      "project_id": "techkids-police",
      "private_key_id": "4848daec9cef6e27b0f0a95c3fa8a857e702fe52",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC84s2+BwPqplJG\nACpl/kasFhZrjsMyBAPNAMU8CI7CRyjgdZkbth6wUDAtdlMOZnUBek3zlQljkRYo\nFWQ/z7A/TnWNfGRg5VqvA0VuwKX3D2qXSMKfFiGSJLj5WhSn2e4XUZpZJgItzbug\nusZ+AuBJmxPqptdyzXy93dzdz+SijR1tnH8yTLUmmhB4qA0W+iIUk7frHChPzjQx\nhWCt878gPQF3LmCs5ltPvebW+4tH4lP15yL+dEKC6aAmiEz2yOOlEI9UiqgJaOnw\nHGWJgetts+qW1T/BiUvH5C70zQRz4foCoSVFnxpFXaHcuxGMUmHZ8870OhdGcbEG\nYhccmvqXAgMBAAECggEASQ2jK0LFVgS7v00jGM1ugfIM+858WiTJX4lTvzNEG4mw\nGpgA/oHCfsiUyZCA8QnZaRfnfDUBK5waqKgVXMSz0thCiNU6cWtjVlr6iKpDxjkV\nLau7chH6K+6+B9q6MG0OM8Cg5KfZoeN3FOQIDwaHvpAW9ONQYpttCnX7jWJxeBhX\nzH471ESoOLhZ8o4tb1EtfK7aPPVEcI3ILe/f296W0RE9U5GAQuew/BVmww16ul71\nifQb/E7I+2VYllCWggnGHg792ORj0kN+DoxcL8wDM8qW1SUsziq5ZLmHfB9gUfZD\nwToq89JKUY7SCVtFurP4UnYh1Pox2Bxj5LBH/Veo6QKBgQDg6mvabvhekk4hF7GW\nNwNLsMRmvrubh86yLgwQ6NVmFJPQarFu+wJxggHAPYRVnQHzSnDIl/aNhLWLFOVW\na49aT2YY19aF1bfk4tBCBhNkaP/XRtHji7ojYkSEbAeFQAqzfqYkb8mqlCjl1XrA\n4AZOOoh7zTB41gwAJLjBY45XYwKBgQDW/aPMZlNQLBS5BcKaFoHSr0WwDYwi/2Ia\n3fPYOJhlrH1ifUOrd35e8Y4bdwNEF260glwQXVAIYA6nDhb7Pnkxq4DKva73I8qM\ngAmF5OSYISLx5RtEV0O5ZT2dcsuxlkm6uqlihVNelawopmk9HCVDR4asEfWAetu3\nozE9v+u4PQKBgQCz1n0akTSC2dUi3MEgbShzcwn3ZXa466Q4EF2Rf7px/u4Z7dWl\n+YqAnAUuY4HWus3+bH01x1xa18wZQ0IFEcfz3By0rJBZPwPlPf5rbFRBKzu2NGhK\n20SgWkiS4ZY503U7BH9wDvpfLExvSXz3j6k7D85lvzGMzQmXa8VWzHXaJQKBgFvQ\nLieYe3P9n0v03cqYWhDzsTsiTfqUPf1jVEO+x7aEF3f8Lu4HNfyuBBZOmSJ3L1v/\nX/nNH+SzwQ4uwjnB0FgZ+gKbRyFcM6AU/fwkaEtfu2C6iw6Ahfei+NFIuRy6JfqM\nxNHCRnxaRw+FIeRrJK662RSbBtE7pqGiG+FXGP+xAoGBAKJDehv7Kxkf3NNOwRYM\nblNoeskaZArUOBLmEjZuBdh99w9GsKZYNideyrny6kTyJ/vQDVnN/RcAqNsnUD3O\nixtFVJeiSZ+9SfUEmBG84rNqQWKz+KV6RE2471WxxfXM6xDTS2/g42VzSZ+zfJzg\nAYQELUY6n3P/EyYqdvDLWljD\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-uhtz5@techkids-police.iam.gserviceaccount.com",
      "client_id": "104123387766766142212",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uhtz5%40techkids-police.iam.gserviceaccount.com"
    }

   // firebase.initializeApp(config)

    let groups = dummy_data

    this.setState({
      groups,
      group_id: _.values(groups)[0].id
    })
  }

  render() {
    return (
      <Container>
        <ClassesDropdown groups={ this.state.groups } changeGroup={ this.changeGroup } current_group={ this.state.groups[this.state.group_id] } />

        <StudentTable students={ this.state.groups[this.state.group_id].students } />
        <SubmissionTable { ...this.state.groups[this.state.group_id] } />
      </Container>
    );
  }
}

export default App;
