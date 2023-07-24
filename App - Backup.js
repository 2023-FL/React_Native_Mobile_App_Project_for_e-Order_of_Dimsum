import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';

const Stack = createStackNavigator();

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const coverImages = [
    require('./assets/Cover_Page_1.jpg'),
    require('./assets/Cover_Page.jpg'),
    require('./assets/Cover_Page_2.jpeg'),
    require('./assets/Cover_Page_4.png'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <HomeScreen
              coverImages={coverImages}
              currentImageIndex={currentImageIndex}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ coverImages, currentImageIndex }) {
  const navigation = useNavigation();

  const handleSigninButton = () => {
    navigation.navigate('Login');
  };

  const handleSignupButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Image
          source={require('./assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <Appbar.Action
          icon={require('./assets/Home.png')}
          onPress={() => console.log('Home Pressed')}
        />
        <Appbar.Content title="流動點心訂購" />
        <Appbar.Action
          icon={require('./assets/List.png')}
          onPress={() => console.log('List Pressed')}
        />
      </Appbar.Header>
      <View style={styles.middleContainer}>
        {/* Content of the middle section */}
        <Image
          source={coverImages[currentImageIndex]}
          style={styles.middleImage}
          resizeMode="cover"
        />
      </View>
      <Appbar.Header style={styles.bottomAppbar}>
        <Image
          source={require('./assets/Chinese_Desert(2).jpg')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
        <View style={styles.bottomButtonsContainer}>
          {/* Content of the bottom section */}
          <TouchableOpacity style={styles.signinButton} onPress={handleSigninButton}>
            <Text style={styles.buttonTextSignIn}>登入</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignupButton}>
            <Text style={styles.buttonTextSignUp}>登記</Text>
          </TouchableOpacity>
        </View>
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleImage: {
    width: '100%',
    height: '100%',
  },
  bottomAppbar: {
    backgroundColor: '#fff',
  },
  bottomImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 135,
    marginLeft: 15,
  },
  signupButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  buttonTextSignIn: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextSignUp: {
    color: '#fff',
    fontSize: 16,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
});