import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const Payment = ({ route }) => {
  const { dimsums } = route.params;

  // Calculate the subtotal for each dimsum item
  const subtotalDimsum1 = dimsums[0]?.item.price * dimsums[0]?.count || 0;
  const subtotalDimsum2 = dimsums[1]?.item.price * dimsums[1]?.count || 0;
  const subtotalDimsum3 = dimsums[2]?.item.price * dimsums[2]?.count || 0;

  // Calculate the grand total amount
  const grandTotal = subtotalDimsum1 + subtotalDimsum2 + subtotalDimsum3;

  return (
    <View style={styles.container}>
      <Card>
        {dimsums[0]?.count > 0 && (
          <View>
            <Image source={require('../assets/dimsum1.jpg')} style={styles.logo} />
            <Text style={styles.paragraph}>
              Subtotal Dimsum 1: ${dimsums[0]?.item.price} x QTY {dimsums[0]?.count} = ${subtotalDimsum1.toFixed(2)}
            </Text>
          </View>
        )}
      </Card>

      <Card>
        {dimsums[1]?.count > 0 && (
          <View>
            <Image source={require('../assets/dimsum2.jpg')} style={styles.logo} />
            <Text style={styles.paragraph}>
              Subtotal Dimsum 2: ${dimsums[1]?.item.price} x QTY {dimsums[1]?.count} = ${subtotalDimsum2.toFixed(2)}
            </Text>
          </View>
        )}
      </Card>

      <Card>
        {dimsums[2]?.count > 0 && (
          <View>
            <Image source={require('../assets/dimsum3.jpg')} style={styles.logo} />
            <Text style={styles.paragraph}>
              Subtotal Dimsum 3: ${dimsums[2]?.item.price} x QTY {dimsums[2]?.count} = ${subtotalDimsum3.toFixed(2)}
            </Text>
          </View>
        )}
      </Card>

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