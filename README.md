# Example Snack Expo of React Native for Chinese Dimsum Order App

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo-cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).

## This example is an elementary level project of React Native, which is applied to develop Chinese Dimsum Order App with the application of following libraties:
I applied below libraries for developing such simple food order app, in which there is no application of external open-resource database, such as realm, friebase, SQLite, MongoDB for storing user information during SigUp, Login and Order processes. In addition, I have just applied OpenMap for the GPS location of the fast food shop / restaurant, not applied of import MapView library and not applied of import 'react-native-payments' or import '@stripe/stripe-react-native' for e-payment; in which these imtermmediate level components will be shown in other new repository with the same project of food order app later. The advanced leve lfo React Native project will be shown of applying A.I. model with tensorflow lite in the app later.
- import React, { useState, useEffect } from 'react';
- import { Appbar } from 'react-native-paper';
- import { NavigationContainer, useNavigation } from '@react-navigation/native';
- import { createStackNavigator } from '@react-navigation/stack';
- import { View, TextInput, Button, Modal, Text, Image, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native';
- import Icon from 'react-native-vector-icons/FontAwesome';
- import AsyncStorage from '@react-native-async-storage/async-storage';
- import React, { useState, useEffect } from 'react';
- import { View, TextInput, Modal, Text, Image, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform} from 'react-native';
- import { Dimensions } from 'react-native';
## Elementary Level of React Native
I have tried to apply 
https://snack.expo.dev/@francis2023/dimsum

![image](https://github.com/2023-FL/React_Native_Mobile_App_Project_for_e-Order_of_Dimsum/assets/57984642/89affcd5-3074-4d2a-9158-027c74fd33c8)

[Youtube 1] (https://www.youtube.com/watch?v=GwM_7qCpFvY)
[Youtube 2] (https://www.youtube.com/watch?v=2u-GNTe6XOY)
