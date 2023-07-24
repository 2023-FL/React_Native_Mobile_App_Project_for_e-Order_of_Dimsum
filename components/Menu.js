import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Main from './Main';
import Dimsum1 from './Dimsum1';
import Dimsum2 from './Dimsum2';
import Dimsum3 from './Dimsum3';
import Payment from './Payment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialIcons } from '@expo/vector-icons';
//import { Card } from 'react-native-paper';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Theme = {
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'white',
    text: 'rgb(28, 28, 30)',
    border: 'rbg(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer theme={Theme}>
        <Tab.Navigator>
          <Tab.Screen
            name='Home'
            component={HomeStack}
            options={{
              tabBarIcon: () => (
                <Image source={require('../assets/Home.png')} style={styles.tabIcon} />
              ),
              tabBarStyle: { backgroundColor: 'orange' },
            }}
          />
          <Tab.Screen
            name='Menu'
            component={Menu}
            options={{
              tabBarIcon: () => (
                <Image source={require('../assets/List.png')} style={styles.tabIcon} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='Dimsum1' component={Dimsum1} />
      <Stack.Screen name='Dimsum2' component={Dimsum2} />
      <Stack.Screen name='Dimsum3' component={Dimsum3} />
      <Stack.Screen name='Payment' component={Payment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});