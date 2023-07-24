import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Picker } from 'react-native';

class Menu extends Component {
  state = {
    dimsums: [
      {
        name: '蝦餃',
        image: 'dimsum1',
        price: 12.5,
        description: 'Ingredient is made from shrimp',
        count: 0,
      },
      {
        name: '燒賣',
        image: 'dimsum2',
        price: 11.5,
        description: 'Ingredient is made from pork',
        count: 0,
      },
      {
        name: '蒸餃',
        image: 'dimsum3',
        price: 9.5,
        description: 'Ingredient is made from shrimp and pork',
        count: 0,
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
    const { dimsums } = this.state;
    const updatedDimsums = dimsums.map((dimsum) => {
      if (dimsum.image === item.image) {
        return {
          ...dimsum,
          count: dimsum.count + 1,
        };
      }
      return dimsum;
    });

    this.setState({ dimsums: updatedDimsums });

    switch (item.image) {
      case 'dimsum1':
        this.props.navigation.navigate('Dimsum1', { item: item, count: dimsums[0].count });
        break;
      case 'dimsum2':
        this.props.navigation.navigate('Dimsum2', { item: item, count: dimsums[1].count });
        break;
      case 'dimsum3':
        this.props.navigation.navigate('Dimsum3', { item: item, count: dimsums[2].count });
        break;
      default:
        break;
    }
  };

  handleCountChange = (item, count) => {
    const { dimsums } = this.state;
    const updatedDimsums = dimsums.map((dimsum) => {
      if (dimsum.image === item.image) {
        return {
          ...dimsum,
          count: count,
        };
      }
      return dimsum;
    });

    this.setState({ dimsums: updatedDimsums });
  };
  
  render() {
    const pickerItems = Array.from({ length: 11 }, (_, index) => (
      <Picker.Item key={index} label={index.toString()} value={index} />
    ));

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dimsums}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => this.handleItemClick(item)}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={this.resolveImageSource(item.image)} />
                </View>
              </TouchableOpacity>
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>$ {item.price}</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={item.count}
                  onValueChange={(count) => this.handleCountChange(item, count)}
                >
                  {pickerItems}
                </Picker>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  picker: {
    marginTop: 3,
  },
});

