import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';

class Menu extends Component {
  state = {
    dimsums: [
      {
        name: 'dimsum1',
        image: 'dimsum1',
        price: 12.5,
        description: 'As many as possible 1',
      },
      {
        name: 'dimsum2',
        image: 'dimsum2',
        price: 11.5,
        description: 'As many as possible 2',
      },
      {
        name: 'dimsum3',
        image: 'dimsum3',
        price: 9.5,
        description: 'As many as possible3',
      },
    ],
    isLoading: true,
  };

  componentDidMount() {
    // Get Location then update Weather
  }

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

  handleItemClick = (item) => {
    // Perform navigation logic here based on the clicked item
    console.log('Item clicked:', item);
    this.props.navigation.navigate(`../components/${item}`, { item });
  };
  
  render() {
    // if (!this.state.isLoading) {
    return (
      <View style={styles.container}>
        {this.state.dimsums.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => this.handleItemClick(item)}
            activeOpacity={0.8}
          >
            <List.Item
              title={item.name}
              description={item.description}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={this.resolveImageSource(item.image)}
                  style={styles.avatar}
                />
              )}
              right={() => <Text style={styles.price}>$ {item.price}</Text>}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
    // }
    // else {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Loading...</Text>
    //     </View>
    //   );
    // }
  }
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});
