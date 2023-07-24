import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Paid extends Component {
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
    const { foodOrder } = route.params;

    const data = [
      { key: '多謝光顧, 你的訂單已被確認, 堂食或外賣的訂單將會在10分鐘內送到。' },
      { key: `你的訂單號是: ${foodOrder}` },
    ];

    return (
      <View style={styles.container}>
        <Appbar.Header>
        <Image
          source={require('../assets/Cover_Page_3.jpeg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <Appbar.Header style={[styles.menuHeader, { backgroundColor: 'transparent' }]}>
            <Appbar.Content title={`${this.state.info.fName} ${this.state.info.lName}, 已支付的訂單 `} titleStyle={[styles.appbarTitle, { fontSize: 20, color: 'white' }]}/>
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
        </Appbar.Header>
        <FlatList
          data={data}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.key}</Text>}
        />
        <TouchableOpacity style={styles.logoutButton} onPress={this._logout}>
          <Text style={styles.logoutButtonText}>登出</Text>
        </TouchableOpacity>
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
}

export default Paid;

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
    textAlign: 'left'
  },
  bottomAppbar: {
    elevation: 0,
    marginTop: 'auto',
    height: 50,
    width: 300,
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
  menuHeader:{
    backgroundColor: 'olive', 
    marginLeft: 5,
  },
  listItem: {
    fontSize: 24,
    padding: 10,
  },
  logoutButton: {
    backgroundColor: 'skyblue',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 100,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});