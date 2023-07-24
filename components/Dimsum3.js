import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

class Dimsum1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.route.params.item.count,
    };
  }

  goToPayment = () => {
    const { navigation } = this.props;
    const { count } = this.state;
    const { dimsums } = this.props.route.params;

    const dimsum1 = dimsums.find((dimsum) => dimsum.name === '蝦餃');
    const dimsum2 = dimsums.find((dimsum) => dimsum.name === '燒賣');
    const dimsum3 = dimsums.find((dimsum) => dimsum.name === '蒸餃');

    if (count > 0) {
      const dimsum1Subtotal = dimsum1.price * count;
      const dimsum2Subtotal = dimsum2.price * dimsum2.count;
      const dimsum3Subtotal = dimsum3.price * dimsum3.count;
      const grandTotal = dimsum1Subtotal + dimsum2Subtotal + dimsum3Subtotal;

      navigation.navigate('Payment', {
        dimsums: {
          dimsum1: {
            image: require('../assets/dimsum1.jpg'),
            price: dimsum1.price,
            count: count,
            subtotal: dimsum1Subtotal,
          },
          dimsum2: {
            image: require('../assets/dimsum2.jpg'),
            price: dimsum2.price,
            count: dimsum2.count,
            subtotal: dimsum2Subtotal,
          },
          dimsum3: {
            image: require('../assets/dimsum3.jpg'),
            price: dimsum3.price,
            count: dimsum3.count,
            subtotal: dimsum3Subtotal,
          },
        },
        grandTotal: grandTotal,
      });
    }
  };


  render() {
    const { count } = this.state;
    const { item } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/dimsum3.jpg')} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Price: $ {item.price}</Text>
        <Text style={styles.count}>Count: {count}</Text>
        <TouchableOpacity style={styles.goToPaymentButton} onPress={this.goToPayment}>
          <Text style={styles.buttonText}>Go to Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Dimsum1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    marginBottom: 8,
  },
  count: {
    fontSize: 18,
    marginBottom: 8,
  },
  goToPaymentButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});