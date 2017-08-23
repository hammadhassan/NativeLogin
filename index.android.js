/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from "firebase";
// import Signup from "./src/Signup";
import LoginForm from "./src/Login";

export default class LoginSignup extends Component {
  state = {
    loggedIn: false
    };
  componentWillMount() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCpaZp08WHx1Ck9GXtzTs67ohTFAfN8sdQ",
        authDomain: "react-native-todo-c7c06.firebaseapp.com",
        databaseURL: "https://react-native-todo-c7c06.firebaseio.com",
        projectId: "react-native-todo-c7c06",
        storageBucket: "react-native-todo-c7c06.appspot.com",
        messagingSenderId: "256827566044"    
    };
    firebase.initializeApp(config);
    this.checkAuthantication()
  }

  checkAuthantication() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: true })
    })
    this.setState({ loggedIn: false })
  }
  render() {
    return (
      <View>
        <LoginForm />
        {/* <Signup /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});

AppRegistry.registerComponent('LoginSignup', () => LoginSignup);
