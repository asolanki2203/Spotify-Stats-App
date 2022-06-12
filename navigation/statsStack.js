import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stats from '../screens/stats';
import TrackInfoScreen from '../screens/trackInfo';
import artistInfoScreen from '../screens/artistInfo';

const statsStack = createNativeStackNavigator();

const StatsStack = () => {
    return (
        <statsStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <statsStack.Screen
                name="StatsScreen"
                component={stats}
                options={{
                    title: 'Your Stats',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <statsStack.Screen
                name="trackInfoScreen"
                component={TrackInfoScreen}
                options={{
                    title: 'Track Info',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <statsStack.Screen
                name="artistInfoScreen"
                component={artistInfoScreen}
                options={{
                    title: 'Artist Info',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </statsStack.Navigator>
    );
}

export default StatsStack;