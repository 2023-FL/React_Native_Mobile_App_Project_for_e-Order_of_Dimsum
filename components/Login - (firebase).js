import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { login } from './Server';
import Icon from 'react-native-vector-icons/FontAwesome';
//import firebase from 'firebase/app';
//import 'firebase/auth';

// Add your Firebase config here
/*const firebaseConfig = {
  // Add your Firebase config here
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};*/

/*if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}*/

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await login(email, password); // Call the login function

      if (user) {
        // User found, return success message
        console.log('Login successful');
        navigation.navigate('Home', { user }); // Pass the user data to Home screen
      } else {
        // User not found or incorrect credentials
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    setForgotPasswordModalVisible(false); // Close the modal after submitting the email
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the App.js page
  };

  const handleSignupButton = () => {
    // Implement signup logic here
    console.log('Signup Pressed');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleProviderSignIn = async (provider) => {
    try {
      let signInProvider;
      switch (provider) {
        case 'google':
          signInProvider = new firebase.auth.GoogleAuthProvider();
          break;
        case 'facebook':
          signInProvider = new firebase.auth.FacebookAuthProvider();
          break;
        case 'twitter':
          signInProvider = new firebase.auth.TwitterAuthProvider();
          break;
        case 'github':
          signInProvider = new firebase.auth.GithubAuthProvider();
          break;
        default:
          throw new Error('Invalid provider');
      }

      const result = await firebase.auth().signInWithPopup(signInProvider);
      const { user } = result;

      if (user) {
        console.log('Sign-in with provider successful:', provider);
        navigation.navigate('Home', { user }); // Pass the user data to Home screen
      } else {
        console.log('Sign-in with provider failed:', provider);
      }
    } catch (error) {
      console.error(`Error occurred during ${provider} sign-in:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <Appbar.Action
          icon={require('../assets/Home.png')}
          onPress={() => console.log('Home Pressed')}
        />
        <Appbar.Content title="流動點心訂購" />
        <Appbar.Action
          icon={require('../assets/List.png')}
          onPress={() => console.log('List Pressed')}
        />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="電郵地址"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="密碼"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={toggleShowPassword}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              style={styles.showPasswordIcon}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <Button title="登入" onPress={handleLogin} />

        <TouchableOpacity style={styles.signinButton} onPress={() => setForgotPasswordModalVisible(true)}>
          <Text style={styles.forgotPasswordButton}>忘記密碼</Text>
        </TouchableOpacity>

        {/* Provider Sign-In Buttons */}
        <View style={styles.providerButtonsContainer}>
          <TouchableOpacity
            style={[styles.providerButton, styles.googleButton]}
            onPress={() => handleProviderSignIn('google')}
          >
            <Icon name="google" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.facebookButton]}
            onPress={() => handleProviderSignIn('facebook')}
          >
            <Icon name="facebook" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.twitterButton]}
            onPress={() => handleProviderSignIn('twitter')}
          >
            <Icon name="twitter" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.providerButton, styles.githubButton]}
            onPress={() => handleProviderSignIn('github')}
          >
            <Icon name="github" style={[styles.providerButtonIcon, { color: '#FFF' }]} />
            <Text style={[styles.providerButtonText, { color: '#FFF' }]}>Sign in with GitHub</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password Modal */}
        <Modal visible={forgotPasswordModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="電郵地址"
              value={forgotPasswordEmail}
              onChangeText={text => setForgotPasswordEmail(text)}
            />
            <Button title="提交" onPress={handleForgotPassword} />
            <Button
              title="關閉"
              onPress={() => setForgotPasswordModalVisible(false)}
            />
          </View>
        </Modal>
      </View>
      <Appbar.Header style={styles.bottomAppbar}>
        <Image
          source={require('../assets/Chinese_Desert(2).jpg')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleSignupButton}>
          <Text style={styles.signup}>登記</Text>
        </TouchableOpacity>
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  showPasswordButton: {
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#f2f2f2',
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
    padding: 20,
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
  forgotPasswordButton: {
    backgroundColor: 'transparent', // No background color
    color: '#2980b9',
    padding: 0, // Remove padding
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
    marginTop: 20,
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
});

export default Login;