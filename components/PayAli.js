import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PayAli extends Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const { fName, lName } = route.params;
    this.state = {
        info: { fName, lName },
        email: '',
        pwd: '',
        showPassword: false,
      }
      this._handleAliPay = this._handleAliPay.bind(this);
  }
  
  _handleAliPay = () => {
    this.setState({ email: 'bbb@gmail.com', pwd: '123456' });
    console.log(this.state.email + this.state.pwd)
    if (this.state.email === this.state.email && this.state.pwd === this.state.pwd) {
      console.log(this.state.email === this.state.presetEmail && this.state.pwd === this.state.presetPassword)
      const foodOrder = Math.floor(Math.random() * 100);
      const { navigation } = this.props;
      const { grandTotal } = this.props.route.params;
      const { fName, lName } = this.state.info;
      navigation.navigate('Paid', { foodOrder, fName, lName });
    } else {
      // handle incorrect email or password
      Alert.alert("There is no such email address registered before or password incorrect!")
    } 
  }

  _logout = () => {
    const { navigation } = this.props;
    AsyncStorage.removeItem('uInfo').then(() => {
      AsyncStorage.clear();
    });
    Alert.alert("user information was deleted !")
    navigation.navigate('Home'); // Navigate to the Home screen
  };
  
  render() {
    const { route } = this.props;
    const { grandTotal } = route.params;

    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Image
            source={require('../assets/Cover_Page_3.jpeg')}
            style={styles.topImage}
            resizeMode="cover"
          />
          <Appbar.Header style={[styles.menuHeader, { backgroundColor: 'transparent' }]}>
            <Appbar.Content title={`${this.state.info.fName} ${this.state.info.lName}, 可網上付款 `} titleStyle={[styles.appbarTitle, { fontSize: 20, color: 'white', textAlign: 'left'}]} />
            <Appbar.Action
              icon="account"
              color="white"
              size={30}
              marginBottom={85}
              onPress={this._handleAccount}
            />
            <Appbar.Action
              icon="magnify"
              color="white"
              size={30}
              marginBottom={85}
              onPress={this._handleSearch}
            />
          </Appbar.Header>
        </Appbar.Header>  
        <View style={styles.container, {flex: 1}}>
          <ImageBackground source={require('../assets/PayAli_logo.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.overlayContainer}>
            <TextInput style={styles.textInputEmail} placeholder="電郵地址" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
            <View style={styles.passwordContainer}>
              <TextInput style={styles.textInputPWD} placeholder="密碼" onChangeText={(text) => this.setState({ pwd: text })} value={this.state.pwd} secureTextEntry={!this.state.showPassword}/>
                <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                  <Icon  name={this.state.showPassword ? 'eye' : 'eye-slash'} size={20} color="#888" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.payButton} onPress={this._handleAliPay}>
                  <Text style={styles.buttonText}>付款</Text>
              </TouchableOpacity>
               </View>       
            </ImageBackground>
            <Text style={styles.total}>Grand Total: $ {grandTotal}</Text>
          </View>
        <Appbar.Header style={styles.bottomAppbar}>
          <Image
            source={require('../assets/Chinese_Desert(2).jpg')}
            style={styles.bottomImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.logoutButton} onPress={this._logout}>
            <Text style={styles.buttonTextLogout}>取消</Text>
          </TouchableOpacity>
        </Appbar.Header>
      </View>
    );
  }
}

export default PayAli;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
 backgroundImage: {
    flex: 1,
    width: 340,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  overlayContainer: {
    width: '55%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'cneter',
    marginTop: 150,
    marginLeft: 50,
    backgroundColor: 'transparent',
  },
  textInputEmail: {
    width: '80%',
    height: 30,
    borderWidth: 1,
    marginLeft: 40,
    marginTop: 50,
    paddingLeft: 5,
    color:'grey',
    marginBottom: 10,
  },
  textInputPWD: {
    width: '150%',
    height: 30,
    borderWidth: 1,
    marginLeft: 40,
    marginTop: 20,
    paddingLeft: 5,
    color:'grey',
    marginBottom: 6,
  },
  passwordContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
      height:'auto'
  },
  payButton:{
      backgroundColor:'skyblue',
      width:'80%',
      height:'auto',
      marginTop:'3%',
      paddingVertical:'3%',
      borderRadius:10,
      alignItems:'center',
      marginLeft: 80,
  },
  buttonText:{
      color:'#fff',
      fontSize:18,
      fontWeight:'bold'
  },
  total:{
      fontSize:18,
      fontWeight:'bold',
      marginLeft: 150,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    width: 380,
    marginTop: 1,
    marginLeft: 0,
    transform: [{ scale: 1.0}],
  },
  bottomAppbar: {
    flex: 1,
    elevation: 0,
    marginTop: 'auto',
    height: 50,
  },
  bottomImage: {
    bottom: 0,
    left: 0,
    right: 0,
    width: 380,
    height: 60,
    transform: [{ scale: 1.0}],
  },
  buttonTextLogout: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    height: 30,
    marginLeft: 0,
  },
  menuHeader:{
    flex: 1,
    backgroundColor: 'olive', 
    marginLeft: 0,
  },
  logoutButton:{
    marginRight: '100%',
  }
});