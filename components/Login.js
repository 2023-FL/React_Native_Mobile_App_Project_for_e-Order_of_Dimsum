import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, Text, Image, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Login extends React.Component{
  state = {
    forgotPasswordModalVisible: false,
    isEnabled: false,
    loggedIn: true, // Set to true initially
    showPasswordOne: false,
    showPasswordTwo: false,
    showPassword: false,
    info:{
    firstName: null,
    lastName: null,
    pwd: null,
    email: null,
    },
    store: {
    fName: null,
    lName: null,
    emailAddress: null,
    password: null,
    },
  };

  componentDidMount(){
    console.log('Mount to Login page');
    AsyncStorage.getItem('uInfo').then(
      (value) => {
        if (!value) {
          // Display an alert if the value of uInfo is not set
          Alert.alert('Error', 'The value of uInfo is not set in AsyncStorage');
          return;
        }
        try {
          const data = JSON.parse(value);
          this.setState({
            store: {
              ...this.state.store,
              fName: data.map((item) => item.split(",")[0].trim()),
              lName: data.map((item) => item.split(",")[1].trim()),
              emailAddress: data.map((item) => item.split(",")[4].trim()),
              password: data.map((item) => item.split(",")[2].trim()),
            },
          });
            {/* checking processes */}
            console.log("user name & email :" + this.state.store.fName + this.state.store.lName, + this.state.store.emailAddress + this.state.store.password);
            data.forEach((item, index) => {
              console.log(index + ':"' + item + '"');
            });
            console.log("length:" + data.length);
          }catch (error) {
              Alert.alert('Error', 'The value of uInfo stored in AsyncStorage is not a valid JSON string');
          }
      });
    }

  //const handleLogin = async () => {
  _handleLogin = () => {
    if (this.state.info.pwd != "" || this.state.info.email != "") {
      AsyncStorage.getItem('uInfo').then((value) => {
            const data = JSON.parse(value);
            const record = data.find((item) =>
            item.split(",")[4].trim() === this.state.info.email);
          if (record && record.split(",")[2].trim() === this.state.info.pwd){
              console.log('Logon successfully');
              console.log("user record: " + record);
              console.log("user name: " + this.state.store.fName + " / " + this.state.store.lName)
              this.props.navigation.navigate('Main', {
                fName: record.split(",")[0].trim(),
                lName: record.split(",")[1].trim(),
              });
          } else if (
            !data.some((item) =>
              item.split(",")[4].trim() === this.state.info.email
              )
            ){
            // Display an alert if the entered email address is not registered
            Alert.alert('Sorry', 'The entered email address is not registered');
          } else {
            Alert.alert('Sorry', 'Password Incorrect !');
          }
      });
    } else {
      Alert.alert('Sorry', 'Email and Password must be filled in');
    }
  };

  handleForgotPassword = () => {
    sendResetPasswordLink(this.state.forgotPasswordEmail.trim());
    this.setState({ forgotPasswordModalVisible: false });
  }

  validateEmail = (email) => {
    // Regular expression pattern to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sendResetPasswordLink = (email) => {
    // Code to send reset password link to the provided email address
    // Implement your logic here or make an API request
    // For example, you can use the following code to make an API request:
    // fetch('https://your-api-endpoint.com/reset-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response data
    //   })
    //   .catch(error => {
    //     // Handle any errors
    //   });
  }

  handleGoBack = () => {
    this.props.navigation.goBack(); // Navigate back to the App.js page
  }

  handleSignupButton = () => {
    // Implement signup logic here
    console.log('Signup Pressed');
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleProviderSignIn = async (provider) => {
      try {
        // sign-in logic codes are under constructed
        console.log('Sign in with', provider);
      } catch (error) {
        console.error(`Error occurred during ${provider} sign-in:`, error);
      }
    }
  render() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
      <Appbar.Content style={styles.topTitle} title="流動點心訂購" />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="電郵地址"
            value={this.state.email}
            onChangeText={(text) => this.setState({ info: { ...this.state.info, email: text } })}

          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="密碼"
            secureTextEntry={!this.state.showPassword}
            value={this.state.pwd}
            onChangeText={(text) => this.setState({ info: { ...this.state.info, pwd: text } })}
          />
          <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
            <Text>{this.state.showPassword ? 'Show' : 'Hide'}</Text>
            <Icon
              name={this.state.showPassword ? 'eye' : 'eye-slash'}
              style={styles.showPasswordIcon}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={this._handleLogin}>
          <Text style={styles.loginButtonText}>登入</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinButton}
  onPress={() => this.setState({ forgotPasswordModalVisible: true })}
>
          <Text style={styles.forgotPasswordButton}>忘記密碼</Text>
        </TouchableOpacity>
        {/* Provider Sign-In Buttons */}
        <View style={styles.providerButtonsContainer}>
          <TouchableOpacity
            style={[styles.providerButton, styles.googleButton]}
            onPress={() => this.setState(handleProviderSignIn('google'))}
          >
            <Icon name="google" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.facebookButton]}
            onPress={() => this.setState(handleProviderSignIn('facebook'))}
          >
            <Icon name="facebook" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.twitterButton]}
            onPress={() => this.setState(handleProviderSignIn('twitter'))}
          >
            <Icon name="twitter" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.githubButton]}
            onPress={() => this.setState(handleProviderSignIn('github'))}
          >
            <Icon name="github" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password Modal */}
          <Modal visible={this.state.forgotPasswordModalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.forgotPasswordInput}
                placeholder="電郵地址"
                value={this.state.forgotPasswordEmail}
                onChangeText={(text) => this.setState({ forgotPasswordEmail: text })}
              />
              {(!this.state.forgotPasswordEmail || !this.state.forgotPasswordEmail.trim()) && (
                <Text style={styles.errorText}>Please enter your email address</Text>
              )}
              {this.state.forgotPasswordEmail && !this.validateEmail(this.state.forgotPasswordEmail.trim()) && (
                <Text style={styles.errorText}>Please enter a valid email address</Text>
              )}
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.button} onPress={this.handleForgotPassword}>
                  <Text style={styles.buttonText}>提交</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setState({ forgotPasswordModalVisible: false })}
                >
                  <Text style={styles.buttonText}>關閉</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>
          </View>   
        </KeyboardAvoidingView>
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
    width: screenWidth,
    height: screenHeight,
  },
  appbar: {
    elevation: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  topTitle: {
    left: 90,
    color: '#FFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 5,
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
  orText: {
    marginVertical: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  topImage: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    width: '100%',
    height: 75,
    transform: [{ scale: 1.2 }],
  },
  bottomAppbar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  bottomImage: {
    bottom: 0,
    width: '100%',
    height: 75,
    transform: [{ scale: 1.25 }],
  },
  forgotPasswordButton: {
    backgroundColor: 'transparent', // No background color
    color: '#2980b9',
    padding: 0, // Remove padding
    marginTop: 0,
  },
  signinButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    marginTop: 15,
  },
  signupButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 15,
  },
  signup: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
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
    color: '#FFF', // Set the color to white
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
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 135,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
    height: '8%',
    alignItems: 'center',
},
loginButtonText: {
  color: '#FFF',
  fontSize: 20,
  fontWeight: 'bold',
},
forgotPasswordInput: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },

handleForgotPasswordInput: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 30,
    paddingHorizontal: 10,
},

closeForgotPasswordInput: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 30,
    paddingHorizontal: 10,
},
});

export default Login;