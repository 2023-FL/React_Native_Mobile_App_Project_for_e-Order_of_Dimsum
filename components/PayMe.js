import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PayAli extends Component {
  constructor(props) {
  super(props);
  const { route } = props;
  const { fName, lName } = route.params;
  this.state = {
      info: { fName, lName },
      email: '',
      pwd: '',
      showPassword: false,
    }
  }
  
  _logout = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('uInfo').then(() => {
      AsyncStorage.clear();
    });
    Alert.alert("user information was deleted !")
    navigation.navigate('Home'); // Navigate to the Home screen
  };
  
  render() {
    const { route } = this.props;
    const { grandTotal } = route.params;

    return (
      <View style={styles.container}>
      <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <Appbar.Header style={[styles.menuHeader, { backgroundColor: 'transparent' }]}>
            <Appbar.Content
              title={`${this.state.info.fName} ${this.state.info.lName}, 可網上付款 `}
              titleStyle={[
                styles.appbarTitle,
                { fontSize: 20, color: 'white', textAlign: 'left' },
              ]}
            />
            <Appbar.Action 
              icon="account" 
              color="white"
              size={30}
              marginBottom={85}
              onPress={this._handleAccount} />
            <Appbar.Action icon="magnify"
              color="white"
              size={30} 
              marginBottom={85}
              onPress={this._handleSearch} />
      </Appbar.Header> 
        <View style={[styles.paymentOptionsContainer, { flex: 1 }]}>
          <TouchableOpacity style={styles.payMeButton} onPress={this.handlePayMeButton}>
            <View style={styles.textOverlayContainer}>
              <Image source={require('../assets/PayMe_logo.png')} style={styles.paymentOptionImage} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>各項總計: $ {grandTotal}</Text>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.buttonText}>付款</Text>
            </TouchableOpacity>
        <Appbar.Header style={styles.bottomAppbar}>
          <Image
            source={require('../assets/Chinese_Desert(2).jpg')}
            style={styles.bottomImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.logoutButton} onPress={this._logout}>
            <Text style={styles.buttonTextLogout}>取消</Text>
          </TouchableOpacity>
        </Appbar.Header>
      </View>
    );
  }
}

export default PayAli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 28,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  paymentOptionImage: {
    width: 220,
  },
  topImage: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 100,
    width: 400,
    transform: [{ scale: 1}],
  },
  menuHeader:{
    flex:1,
    position: 'absolute',
    marginBottom: 45,
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
    height: '8%',
    alignItems: 'center',
  },
  buttonText: {
    marginBottom: 28,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
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
    width: '100%',
    height: 40,
    transform: [{ scale: 2.0}],
  },
  buttonTextLogout: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 30,
  },
  logoutButton: {
    backgroundColor: '', //#2980b9
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 130,
    marginTop: 0,
  },
});