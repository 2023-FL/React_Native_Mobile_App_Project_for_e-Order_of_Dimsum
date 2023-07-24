import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

class Payment extends Component {

  resolveImageSource = (imageName) => {
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


  render() {
    const { navigation, route } = this.props;
    const { dimsums } = route.params;

    const subtotalList = dimsums.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Image style={styles.image} source={this.resolveImageSource(item.image)} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Price: $ {item.price}</Text>
          <Text style={styles.count}>Count: {item.count}</Text>
          <Text style={styles.subtotal}>Subtotal: $ {item.price * item.count}</Text>
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
        <Appbar.Action
          icon={require('../assets/Home.png')}
          onPress={() => console.log('Home Pressed')}
        />
        <Appbar.Action
          icon={require('../assets/List.png')}
          onPress={() => console.log('List Pressed')}
        />
      </Appbar.Header>
        <Text style={styles.title}>結算 匯總</Text>
        <View style={styles.subtotalContainer}>{subtotalList}</View>
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Grand Total: $ {grandTotal}</Text>
        </View>
      
      <Appbar.Header style={styles.bottomAppbar}>
        <Image
          source={require('../assets/Chinese_Desert(2).jpg')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.epaymentButton} onPress={handlePaymentButton}>
          <Text style={styles.epayment}>付款</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
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
    marginTop: 15,
  },
  epayment: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});