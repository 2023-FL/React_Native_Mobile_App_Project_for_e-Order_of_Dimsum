import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Octopus extends Component {
  constructor(props) {
  super(props);
  const { route } = props;
  const { fName, lName } = route.params;
  this.state = {
    info: { fName, lName },
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
        <Appbar.Header>
        <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <Appbar.Header style={[styles.menuHeader, { backgroundColor: 'transparent' }]}>
            <Appbar.Content title={`${this.state.info.fName} ${this.state.info.lName}, 八達通付款 `} titleStyle={[styles.appbarTitle, { fontSize: 20, color: 'white' }]}/>
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
            <Appbar.Action icon="dots-vertical" titleStyle={{ fontSize: 14, color: 'white' }} onPress={this._handleMore} />
          </Appbar.Header> 
        </Appbar.Header>
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity style={styles.alipayButton} onPress={this.handleAlipayButton}>
            <View style={styles.textOverlayContainer}>
              <Image source={require('../assets/Octopus.png')} style={styles.paymentOptionImage} />
              <Text style={styles.epaymentOne}>請到前台掃描八達通二維碼付款</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>各項總計: $ {grandTotal}</Text>
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

export default Octopus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  paymentOptionText: {
    fontSize: 18,
    marginRight: 8,
  },
  paymentOptionImage: {
    width: 220,
    height: 350,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 37.6,
    marginTop: 1,
    transform: [{ scale: 2.0}],
  },
  appbarTitle: {
    marginBottom: 8,
    left: 200,
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
  textOverlayContainer: {
    position: 'relative',
  },
  epaymentOne: {
    position: 'absolute',
    left: 25,
    right: 0,
    bottom: 264,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
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
  menuHeader:{
    backgroundColor: 'olive', 
    marginLeft: 50,
  }
});