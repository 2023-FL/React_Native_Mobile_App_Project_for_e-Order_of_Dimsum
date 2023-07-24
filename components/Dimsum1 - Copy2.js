import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import dimsum1Image from '../assets/dimsum1.jpg';

class Dimsum1 extends Component {
  handleGoToPayment = () => {
    const { navigation, route } = this.props;
    const { item, count } = route.params;
    navigation.navigate('Payment', { item, count });
  };

  handleCancel = () => {
    const { navigation, route } = this.props;
    const { item, count } = route.params;
    navigation.navigate('Main', { item, count });
  };

  render() {
    const { item, count } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={dimsum1Image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: $ {item.price}</Text>
        <Text style={styles.count}>Count: {count}</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleGoToPayment}>
          <Text style={styles.buttonText}>Go to Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={this.handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
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
    padding: 16,
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
  description: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  count: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: '#777',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});