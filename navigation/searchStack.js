import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import searchScreen from '../screens/searchScreen';
import TrackInfoScreen from '../screens/trackInfo';
import artistInfoScreen from '../screens/artistInfo';

const homeStack = createNativeStackNavigator();
const GlobalChartStack = () => {
    return (
        <homeStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <homeStack.Screen
                name="Search Screen"
                component={searchScreen}
                options={{
                    title: 'Search',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                        height: 20
                    },
                    headerTintColor: '#fff',
                }}
            />
            <homeStack.Screen
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
            <homeStack.Screen
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
        </homeStack.Navigator>
    );
}

export default GlobalChartStack;