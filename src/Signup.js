import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class Signup extends Component {

    state = {
        userFullName: '',
        email: '',
        password: '',
        error: '',
        isLoading: false
    }

    SignUp() {
        const { email, password } = this.state;
        
        this.setState({ 
            error: '',
            isLoading: true
        })

        firebase.auth().createUserWithEmailAndPassword(email, password)
            // Handle respnse here
            .then((response) => {
                firebase.database().ref('/').child(`nativeUser/${response.uid}`).set(this.state);
                this.nowSignupSuccess()
                console.log("Response", response)
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                this.setState({
                    error: errorMessage,
                    isLoading: false
                })
                console.log(errorMessage);
            });
    }

    nowSignupSuccess() {
        this.setState({
            email: '',
            password: '',
            isLoading: false })
    }

    renderButtonAndLoader() {
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
        <Button onPress={this.SignUp.bind(this)}>
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
                            label="Full Name"
                            value={this.state.userFullName}
                            placeholder="Write something"
                            onChangeText={userFullName => { this.setState({ userFullName }) }}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            label="Email"
                            value={this.state.email}
                            placeholder="Write Email"
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