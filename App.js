
import React from 'react';
import {Image, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CoinsStack from './src/components/Coins/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoritesStack';

import Colors from './src/utils/colors';

const bankOutline = <MaterialCommunityIcons name='bank-outline' size={30} />;

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Coins') {
              iconName = <MaterialCommunityIcons name='bank' size={30} color={color}/>;
            }else{
              iconName = <MaterialCommunityIcons name='star' size={30} color={color}/>;
            }
  
            // You can return any component that you like here!
            return iconName;
          },
        })}
        tabBarOptions ={{
          style:{
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name='Coins'
          component={CoinsStack}
        />
        <Tabs.Screen
          name='Favorites'
          component={FavoritesStack}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
