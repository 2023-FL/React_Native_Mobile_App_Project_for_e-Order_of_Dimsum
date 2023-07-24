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
    const imageSources = [dimsum1Image, dimsum2Image, dimsum3Image];
    return dimsums.map((dimsum, index) => {
      const subtotal = dimsum.item.price * dimsum.count || 0;

      if (dimsum.count > 0) {
        return (
          <Card key={index}>
            <View>
              <Image source={imageSources[index]} style={styles.logo} />
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
