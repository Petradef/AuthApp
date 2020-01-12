import React, {Component} from 'react'
import { View } from 'react-native'
import  firebase  from 'firebase';


import {Header, Button, Spinner}  from './src/components/common/'
import LoginForm from './src/components/LoginForm'

class App extends Component {

  state = { loggedIn: null}

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAkuz_RgRzrUWXNhMgb3R-sbwI4RqIgIQY",
      authDomain: "authapp-2532d.firebaseapp.com",
      databaseURL: "https://authapp-2532d.firebaseio.com",
      projectId: "authapp-2532d",
      storageBucket: "authapp-2532d.appspot.com",
      messagingSenderId: "284352809120",
      appId: "1:284352809120:web:f1b8230c5cb4873ff721c5",
      measurementId: "G-RZTQL6D4C6"
    };
    // Initialize Firebase
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);      
    }
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true})
      } else {
        this.setState ({ loggedIn: false})
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      )
    
      case false:
        return <LoginForm/>
        default:
          return<Spinner/>
    }
  }

  render() {
    return (
      <View>
          <Header title="Authentication"/>
          {this.renderContent()}
      </View>
    )
  }
}

export default App