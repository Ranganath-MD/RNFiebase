
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground
} from 'react-native';
import firebase from "firebase"
import image from "./logo.png"
import LoginForm from "./src/components/LoginForm"
import { Button } from 'react-native-elements';
import Spinner from "./src/components/Spinner"

class App extends React.Component {
  state = {
    loggedIn: false
  }
  componentWillMount(){
    // checking the firebase whether app is initializing once
    if (!firebase.apps.length) {
      try {
        // initializing firebase
        firebase.initializeApp({
          apiKey: "AIzaSyBrUuyopp5bWbWcUhgwBR2NyOl07igpcVE",
          authDomain: "react-native-firebase-au-634ec.firebaseapp.com",
          databaseURL: "https://react-native-firebase-au-634ec.firebaseio.com",
          projectId: "react-native-firebase-au-634ec",
          storageBucket: "react-native-firebase-au-634ec.appspot.com",
          messagingSenderId: "676596790073",
          appId: "1:676596790073:web:8967b60d28cda62f716ee8",
          measurementId: "G-B1EW95840L"
        })
      } catch (err) {
          console.error('Firebase initialization error raised', err.stack)
      }
    }

    // checking the firebase to check whether the user is logged in or not
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderButton = () => {
    return(
      <Button
        title="Logout"
        type="outline"
        buttonStyle={{ width: 300}}
        containerStyle = {{
        alignItems : "center"
        }}
        onPress={() => firebase.auth().signOut()} // logout from the account
      />
    )
  }

renderContent = () => {
  switch (this.state.loggedIn){
    case true :
      return this.renderButton();
    case false :
      return this.renderForm();
    default :
      return <Spinner size="large"/>
  }
}

  renderForm = () => {
      return <LoginForm />
    }


  renderHeader = () => {
    return(
      <ImageBackground
        accessibilityRole={'image'}
        source={image}
        style={styles.background}
        imageStyle={styles.logo}>
        <Text style={styles.text}>Firebase Auth</Text>
      </ImageBackground>
    )
  }

  render(){
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          {this.renderHeader()}
          {this.state.loggedIn ? this.renderButton() : this.renderContent()}

        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 30,
    paddingTop: 30,
    paddingHorizontal: 32,
  },
  logo: {
    opacity: 0.1,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: -128,
    marginBottom: 20,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "black",
    fontFamily: "monospace"
  },
});

export default App;
