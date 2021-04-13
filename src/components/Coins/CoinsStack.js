import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../../utils/colors';
import CoinsScreen from './CoinsScreen';
import CoinsDetailScreen from '../CoinDetail/CoinsDetailScreen';


const Stack = createStackNavigator();

const CoinsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen
                name='Coins'
                component={CoinsScreen}
            />

            <Stack.Screen
                name='Detalle'
                component={CoinsDetailScreen}
            />

        </Stack.Navigator>
    );
}

export default CoinsStack;