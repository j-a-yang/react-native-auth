import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAbxwWSEyxbVPaFR--fsb6axDnKpp8i5LI',
      authDomain: 'auth-b9cc0.firebaseapp.com',
      databaseURL: 'https://auth-b9cc0.firebaseio.com',
      projectId: 'auth-b9cc0',
      storageBucket: 'auth-b9cc0.appspot.com',
      messagingSenderId: '608684598027'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
          this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
