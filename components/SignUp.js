import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, Image, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignUp extends React.Component {

  /*componentDidMount(){
    AsyncStorage.getItem('uInfo').then(
      (value) => {
        console.log(value)
    });
    this.setState({ firstName: null, lastName: null, password: null, confirmedPassword: null, confirmedEmail: null, isEnabled: false, loggedIn: true }); // Clear the values and set loggedIn to false
    AsyncStorage.clear();
  }*/

  toggleShowPasswordOne = () => {
    this.setState({showPasswordOne: !this.state.showPasswordOne});
  };
  
  toggleShowPasswordTwo = () => {
    this.setState({showPasswordTwo: !this.state.showPasswordTwo});
  };
  
  state = {
    firstName: null,
    lastName: null,
    password: null,
    confirmedPassword: null,
    emailAddress: null,
    confirmedEmail: null,
    isEnabled: false,
    loggedIn: true, // Set to true initially
    showPasswordOne: false,
    showPasswordTwo: false
  };

  _handleSignUp = async () => {
    try {
      if (this.state.password !== this.state.confirmedPassword) {
        throw new Error("Passwords do not match");
      }
      if(this.state.emailAddress !== this.state.confirmedEmail){
        throw new Error("The input Email do not match");
      }

      // Get existing users from AsyncStorage
    const existingUsers = await AsyncStorage.getItem('uInfo');
    let users = [];
    if (existingUsers) {
      try {
        const parsedUsers = JSON.parse(existingUsers);
        if (Array.isArray(parsedUsers)) {
          users = parsedUsers;
          console.log("users data : " + users);
        }
      } catch (error) {
        console.log('Error parsing existing users:', error);
      }
    }
    
    // Check if name or email already exists
    const nameExists = users.filter(user => user !== null).some(user => user.split(",")[0].trim() === this.state.firstName && user.split(",")[1].trim() === this.state.lastName);
    console.log("nameExists : " + nameExists);
    if (nameExists === true) {
      Alert.alert('Name already exists', 'The first name and last name you entered are already registered.');
      return;
    }
      const emailExists = users.filter(user => user !== null).some(user => user.split(",")[4].trim() === this.state.emailAddress);
      console.log('emailExists:', emailExists);
      console.log('this.state.emailAddress:', this.state.emailAddress);
      if (emailExists) {
        Alert.alert('Email already exists', 'The email address you entered is already registered.');
        return;
      }

      // Add new user to users array
      users.push(`${this.state.firstName}, ${this.state.lastName}, ${this.state.password}, ${this.state.confirmedPassword}, ${this.state.emailAddress}, ${this.state.confirmEmail}, ${this.state.loggedIn}`);
      console.log("new user data added: " + users)
      // Store updated users array in AsyncStorage
      await AsyncStorage.setItem('uInfo', JSON.stringify(users))
      .then(() => {
        this.props.navigation.navigate('Login');
      });
    } catch(error) {
      console.log(error)
    }
  }
render() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="姓氏"
          onChangeText={(text) => this.setState({ lastName: text })}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="名字"
          onChangeText={(text) => this.setState({ firstName: text })}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="電郵地址"
          onChangeText={(text) => this.setState({ emailAddress: text })}
          value={this.state.emailAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="再確認電郵地址"
          onChangeText={(text) => this.setState({ confirmedEmail: text })}
          value={this.state.confirmedEmail}
        />
        <View style={styles.inputContainerOne}>
        <TextInput
          style={styles.input}
          placeholder="密碼"
          secureTextEntry={!this.state.showPasswordOne}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={this.toggleShowPasswordOne}
          >
            <Icon
              name={this.state.showPasswordOne ? 'eye' : 'eye-slash'}
              style={styles.showPasswordIcon}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainerTwo}>
        <TextInput
          style={styles.input}
          placeholder="確認密碼"
          secureTextEntry={!this.state.showPasswordTwo}
          onChangeText={(text) => this.setState({confirmedPassword: text })}
          value={this.state.confirmedPassword}
        />
        <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={this.toggleShowPasswordTwo}
          >
            <Icon
              name={this.state.showPasswordTwo ? 'eye' : 'eye-slash'}
              style={styles.showPasswordIcon}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={this._handleSignUp}>
          <Text style={styles.signUpButtonText}>登記</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>-----------或----------</Text>

        <View style={styles.providerButtonsContainer}>
          <TouchableOpacity
            style={[styles.providerButton, styles.googleButton]}
            onPress={() => handleSocialSignUp('google')}
          >
            <Icon name="google" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.facebookButton]}
            onPress={() => handleSocialSignUp('facebook')}
          >
            <Icon name="facebook" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.twitterButton]}
            onPress={() => handleSocialSignUp('twitter')}
          >
            <Icon name="twitter" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.githubButton]}
            onPress={() => handleSocialSignUp('github')}
          >
            <Icon name="github" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Appbar.Header style={styles.bottomAppbar}>
        <Image
          source={require('../assets/Chinese_Desert(2).jpg')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </Appbar.Header>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 3,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  orText: {
    marginVertical: 10,
   fontSize: 16,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 75,
    transform: [{ scale: 1.0 }],
  },
  bottomAppbar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  bottomImage: {
    width: '100%',
    height: 50,
    transform: [{ scale: 1.2 }],
  },
  googleButton: {
    backgroundColor: '#dd4b39',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  twitterButton: {
    backgroundColor: '#1da1f2',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  providerButtonsContainer: {
    marginTop: 10,
  },
  providerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  providerButtonIcon: {
    marginRight: 10,
    color: '#FFF',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainerOne: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputContainerTwo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  showPasswordButton: {
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
  showPasswordIcon: {
    width: 20,
    height: 20,
  },
  showPasswordButton: {
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
});

export default SignUp;