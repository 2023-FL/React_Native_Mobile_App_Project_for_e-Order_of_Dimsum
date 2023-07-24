import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Dimsum2 from './Dimsum2';
import Dimsum3 from './Dimsum3';

class Dimsum1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };

  decrementCount = () => {
    if (this.state.count > 0) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }));
    }
  };

  goToPayment = () => {
  const { navigation } = this.props;
  const { count } = this.state;

  if (count > 0) {
    const { dimsums } = this.props.route.params;

    // Calculate subtotal value for Dimsum1
    const dimsum1Price = 10;
    const dimsum1Subtotal = count * dimsum1Price;

    // Get price and count values from Dimsum2 and Dimsum3
    const { dimsum2Count, dimsum2Price } = this.props.route.params;
    const { dimsum3Count, dimsum3Price } = this.props.route.params;

    // Calculate subtotal value for Dimsum2 and Dimsum3
    const dimsum2Subtotal = dimsum2Count * dimsum2Price;
    const dimsum3Subtotal = dimsum3Count * dimsum3Price;

    // Calculate grand total
    const grandTotal = dimsum1Subtotal + dimsum2Subtotal + dimsum3Subtotal;

    const selectedDimsum = {
      name: 'Dimsum 1',
      price: dimsum1Price,
      count: count,
      image: require('../assets/dimsum1.jpg'), // Update with the actual image path
    };

    const updatedDimsums = [...dimsums, selectedDimsum];
    navigation.navigate('Payment', {
      dimsums: updatedDimsums,
      dimsum1Subtotal: dimsum1Subtotal,
      dimsum2Subtotal: dimsum2Subtotal,
      dimsum3Subtotal: dimsum3Subtotal,
      grandTotal: grandTotal,
    });
  }
};


  render() {
    const { count } = this.state;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/dimsum1.jpg')} />
        <Text style={styles.name}>Dimsum 1</Text>
        <Text style={styles.price}>Price: $10</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.button} onPress={this.decrementCount}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity style={styles.button} onPress={this.incrementCount}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
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
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
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