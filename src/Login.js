import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    }

    Login() {
        const { email, password } = this.state;
        this.setState({ 
            error: '',
            isLoading: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
        // Handle respnse here
        .then(this.nowLoginSuccess())
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                this.setState({
                    error: errorMessage,
                    isLoading: false
                })
            });
    }

    nowLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            isLoading: false
        })
    };

    renderButtonAndLoader() {
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
            <Button onPress={this.Login.bind(this)}>
                Submit
            </Button>
        )
    }


    render() {
        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            value={this.state.email}
                            placeholder="Enter Email"
                            onChangeText={email => { this.setState({ email }) }}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Password"
                            secureTextEntry
                            value={this.state.password}
                            placeholder="Enter password"
                            onChangeText={password => { this.setState({ password }) }}
                        />
                    </CardSection>

                    <CardSection>
                        <Text style={errorStyle}>
                           {this.state.error}
                        </Text>
                    </CardSection>

                    <CardSection>
                        {this.renderButtonAndLoader()}
                    </CardSection>
                </Card>
            </View>
        )
    }
}

const errorStyle = {
    color: 'red'
}