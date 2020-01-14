import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import firebase from 'firebase';
import Spinner  from './Spinner';
import { Input, Button, Card } from "react-native-elements"

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress = () => {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true})

    // Allow the user to login with an email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        // if in case of new user
        // it creates new user and allow you to login
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(() => {
            this.setState(this.onLoginFail)
          });
      });
  }

  onLoginFail = () =>  {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      // <Button onPress={this.onButtonPress.bind(this)}>
      //   Log in
      // </Button>
      <Button
        title="Login"
        type="solid"
        buttonStyle={{ width: 300}}
        containerStyle = {{
          alignItems : "center"
        }}
        onPress={this.onButtonPress}
    />
    );
  }

  render() {
    return (
      <Card>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

          {this.renderButton()}
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
    marginBottom: 20
  }
};

export default LoginForm;
