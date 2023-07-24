import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Payment extends Component {
  constructor(props) {
  super(props);
  const { route } = props;
  const { fName, lName } = route.params;
  this.state = {
    info: { fName, lName },
    }
  }

  handlePaymentButton = () => {
    const { navigation } = this.props;
    const { dimsums } = this.props.route.params;
    const grandTotal = dimsums.reduce((total, item) => total + item.price * item.count, 0);
    const { fName, lName } = this.state.info;
    navigation.navigate('PayMethod', { grandTotal, fName, lName });
  };

  _logout = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('uInfo').then(() => {
      AsyncStorage.clear();
    });
    Alert.alert("user information was deleted !")
    navigation.navigate('App'); // Navigate to the Home screen
  };
  
  render() {
    const { route } = this.props;
    const { dimsums } = route.params;

    const resolveImageSource = (imageName) => {
      switch (imageName) {
        case 'dimsum1':
          return require('../assets/dimsum1.jpg');
        case 'dimsum2':
          return require('../assets/dimsum2.jpg');
        case 'dimsum3':
          return require('../assets/dimsum3.jpg');
        default:
          return null;
      }
    };

    const subtotalList = dimsums.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Image style={styles.image} source={resolveImageSource(item.image)} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>單價: $ {item.price}</Text>
          <Text style={styles.count}>數量: {item.count}</Text>
          <Text style={styles.subtotal}>單項總計: $ {item.price * item.count}</Text>
        </View>
      </View>
    ));

    const grandTotal = dimsums.reduce((total, item) => total + item.price * item.count, 0);

    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Image
            source={require('../assets/Cover_Page_3.jpeg')}
            style={styles.topImage}
            resizeMode="cover"
          />
          <Appbar.Header style={[styles.menuHeader, { backgroundColor: 'transparent' }]}>
            <Appbar.Content title={`${this.state.info.fName} ${this.state.info.lName}, 結算總額如下`} titleStyle={{ fontSize: 19, color: 'white' }}/>
            <Appbar.Action 
              icon="account" 
              color="white"
              size={22}
              onPress={this._handleAccount} />
            <Appbar.Action icon="magnify"
              color="white"
              size={22} 
              onPress={this._handleSearch} />
            <Appbar.Action icon="dots-vertical" titleStyle={{ fontSize: 14, color: 'white' }} onPress={this._handleMore} />
          </Appbar.Header>  
          <Appbar.Content title="結算" />
          <Appbar.Action
            icon={require('../assets/List.png')}
            onPress={() => console.log('List Pressed')}
          />
        </Appbar.Header>
        <View style={styles.subtotalContainer}>{subtotalList}</View>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>各項總計: $ {grandTotal}</Text>
        </View>

        <Appbar.Header style={styles.bottomAppbar}>
          <Image
            source={require('../assets/Chinese_Desert(2).jpg')}
            style={styles.bottomImage}
            resizeMode="cover"
          />
          <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={this._logout}>
            <Text style={styles.buttonTextLogout}>退出</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.epaymentButton} onPress={this.handlePaymentButton}>
            <Text style={styles.epayment}>付款</Text>
          </TouchableOpacity>
          </View>
        </Appbar.Header>
      </View>
    );
  }
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtotalContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
  },
  count: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  epaymentButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 0,
  },
  epayment: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 0,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    transform: [{ scale: 1.41}],
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    transform: [{ scale: 1.6 }],
    marginBottom: -8,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 13,
    alignItems: 'center',
    position: 'absolute', 
    top: 0, 
    left: 0
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
    fontSize: 10,
  },
});