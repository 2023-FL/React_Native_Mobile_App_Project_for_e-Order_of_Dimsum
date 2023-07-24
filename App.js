import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Payment from './components/Payment';
import PayMethod from './components/PayMethod';
import AliPay from './components/aliPay';
import Octopus from './components/Octopus';
import PayAli from './components/PayAli';
import PayMe from './components/PayMe';
import Paid from './components/Paid';
import Home from './App';

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
    }, 10000);

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
        <Stack.Screen name="Login" options={{ title: '登入', headerShown: true }} component={Login} />
        <Stack.Screen name="SignUp" options={{ title: '登記', headerShown: true }} component={SignUp} />
        <Stack.Screen name="Main" options={{ title: '菜單', headerShown: true }} component={Main} />
        <Stack.Screen name="Payment" options={{ title: '結算', headerShown: true }} component={Payment} />
        <Stack.Screen name="PayMethod" options={{ title: '付款方法', headerShown: true }} component={PayMethod} />
        <Stack.Screen name="aliPay" options={{ title: '支付寶付款', headerShown: true }} component={AliPay} />
        <Stack.Screen name="Octopus" options={{ title: '八達通付款', headerShown: true }} component={Octopus} />
        <Stack.Screen name="PayAli" options={{ title: 'HK支付寶付款', headerShown: true }} component={PayAli} />
        <Stack.Screen name="PayMe" options={{ title: 'HSBC PayMe', headerShown: true }} component={PayMe} />
      <Stack.Screen name="Paid" options={{ title: '已支付款項', headerShown: true }} component={Paid} />
      <Stack.Screen name="App" options={{ title: '', headerShown: true }} component={Home} />
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
        <Appbar.Content style={styles.topTitle} title="流動點心訂購" />
      </Appbar.Header>
      <View style={styles.middleContainer}>
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
    width: '99.3%',
    height: '100%',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    marginRight: 50,
    transform: [{ scale: 1.43}],
  },
  topTitle: {
    left: 85,
    right: 0,
    fontSize: 50,
    fontWeight: 'bold',
    height: 30,
  },
  bottomAppbar: {
    elevation: 0,
    marginTop: 'auto',
    height: 50,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    transform: [{ scale: 1.0 }],
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  signinButton: {
    backgroundColor: '', //#2980b9
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 130,
    marginTop: 15,
  },
  signupButton: {
    backgroundColor: '', //#27ae60
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 15,
  },
  buttonTextSignIn: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 30,
  },
  buttonTextSignUp: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 30,
  },
});