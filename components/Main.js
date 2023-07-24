import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Picker, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import openMap from 'react-native-open-maps';

class Main extends React.Component {
  constructor(props) {
  super(props);
  const { route } = props;
  const { fName, lName } = route.params;
  this.state = {
    info: { fName, lName },
    dimsums: [
      {
        name: '蝦餃',
        image: 'dimsum1',
        price: 12.5,
        description: '成份由大蝦，豬肉，冬菇，占米粉造皮',
        count: 0,
      },
      {
        name: '燒賣',
        image: 'dimsum2',
        price: 11.5,
        description: '成份由豬肉，冬菇，蝦米，占米粉造皮',
        count: 0,
      },
      {
        name: '蒸餃',
        image: 'dimsum3',
        price: 9.5,
        description: '成份由羊肉，冬筍，香蔥，占米粉造皮',
        count: 0,
      },
    ],
    isLoading: true,
  };
  }   
 
  //Checking Statement
  componentDidMount() {
    console.log('Get in Main.js successfully');
    console.log("user name: " + this.state.info.lName + " " + this.state.info.fName);
  }

  _logout = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('uInfo').then(() => {
      AsyncStorage.clear();
    });
    Alert.alert("user information was deleted !")
    navigation.navigate('Home'); // Navigate to the Home screen
  };

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
    switch (item.image) {
      case 'dimsum1':
        this.props.navigation.navigate('Dimsum1', {
          item: item,
          onCountChange: this.handleCountChange,
        });
        break;
      case 'dimsum2':
        this.props.navigation.navigate('Dimsum2', {
          item: item,
          onCountChange: this.handleCountChange,
        });
        break;
      case 'dimsum3':
        this.props.navigation.navigate('Dimsum3', {
          item: item,
          onCountChange: this.handleCountChange,
        });
        break;
      default:
        return null;
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

  handleGoToPayment = () => {
    const { navigation } = this.props;
    const dimsums = this.state.dimsums;
    const { fName, lName } = this.state.info;
    navigation.navigate('Payment', { dimsums, fName, lName });
  };

  handleOpenMap = () => {
    const { dimsumShops } = this;
    const firstShop = dimsumShops[0];
    openMap({
      latitude: firstShop.latitude,
      longitude: firstShop.longitude,
      query: firstShop.name,
    });
  };

  dimsumShops = [
    {
      name: 'Dimsum Shop 1',
      latitude: 22.32215,
      longitude: 114.16994,
    },
    {
      name: 'Dimsum Shop 2',
      latitude: 1.3120,
      longitude: 103.8768,
    }
  ];
  
  _handleSearch = () => {
    console.log('Search button pressed');
  };

  _handleMore = () => {
    console.log('More button pressed');
  };

  render() {
    const pickerItems = Array.from({ length: 11 }, (_, index) => (
      <Picker.Item key={index} label={index.toString()} value={index} />
    ));
    const { info, dimsums } = this.state;
    return (
      <View style={styles.container}>
      <Appbar.Header style={styles.menuHeader}>
        <Appbar.Content title={`Welcome ${this.state.info.fName} ${this.state.info.lName}`} titleStyle={{ fontSize: 13 }}/>
        <Appbar.Action icon="account" onPress={this._handleAccount} />
        <Appbar.Action icon="magnify" onPress={this._handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
      </Appbar.Header>      
        <FlatList
          data={dimsums}
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
        
        <Button title="Check Dimsum Shop on Map" onPress={this.handleOpenMap} />
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
          <TouchableOpacity style={styles.paymentButton} onPress={this.handleGoToPayment}>
            <Text style={styles.paymentButtonText}>付款</Text>
        </TouchableOpacity>
        </View>
        </Appbar.Header>
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'olive',
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
  paymentButton: {
    backgroundColor: '', // remove the background color
    color: 'white',
    fontSize: 50, // increase the font size
    fontWeight: 'bold',
    height: 30,
    marginRight: 16, // add margins to position the button
    marginTop: 6,
  },
  paymentButtonText:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 30,
  },
  bottomAppbar: {
    backgroundColor: '#fff',
    elevation: 0,
  },
  bottomImage: {
    bottom: 0,
    width: '100%',
    height: 45,
    transform: [{ scale: 1.25 }],
  },
  map: {
    flex: 1,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
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
    marginTop: 6,
  },
  menuHeader:{
    backgroundColor: 'olive', 
    fontSize: 1,
  },
});