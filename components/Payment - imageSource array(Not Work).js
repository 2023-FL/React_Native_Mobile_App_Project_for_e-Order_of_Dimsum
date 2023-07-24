import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import dimsum1Image from '../assets/dimsum1.jpg';
import dimsum2Image from '../assets/dimsum2.jpg';
import dimsum3Image from '../assets/dimsum3.jpg';

const Payment = ({ route }) => {
  const { dimsums } = route.params;

  // Calculate the grand total amount
  const grandTotal = dimsums.reduce((total, dimsum) => {
    return total + (dimsum.item.price * dimsum.count || 0);
  }, 0);

  // Check conditions and display subtotal values accordingly
  const displaySubtotals = () => {
    return dimsums.map((dimsum, index) => {
      const subtotal = dimsum.item.price * dimsum.count || 0;
      let imageSource = [];

      if (dimsum.count > 0) {
        if (dimsum.count > 1) {
          if (index === 0) {
            imageSource[0] = dimsum1Image;
          } else if (index === 1) {
            imageSource[1] = dimsum2Image;
          } else if (index === 2) {
            imageSource[2] = dimsum3Image;
          }
        } else {
          // Display a generic image if count is 1
          imageSource[0] = require('../assets/dimsum1.jpg');
          imageSource[1] = require('../assets/dimsum2.jpg');
          imageSource[2] = require('../assets/dimsum3.jpg');
        }

        return (
          <Card key={index}>
            <View>
              {imageSource && <Image source={imageSource[index]} style={styles.logo} />}
              <Text style={styles.paragraph}>
                Subtotal Dimsum {index + 1}: ${subtotal.toFixed(2)}
              </Text>
            </View>
          </Card>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <View style={styles.container}>
      {displaySubtotals()}
      <Text style={styles.paragraph}>Grand Total: ${grandTotal.toFixed(2)}</Text>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
});

