import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import TrackInfoScreen from '../screens/trackInfo';
import GlobalChartsScreen from '../screens/globalCharts';
import artistInfoScreen from '../screens/artistInfo';
import RecentlyPlayed from '../screens/recentlyPlayed'

const homeStack = createNativeStackNavigator();
const OverviewStack = () => {
    return (
        <homeStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <homeStack.Screen
                name="OverviewScreen"
                component={HomeScreen}
                options={{
                    title: 'Overview',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                        height: 20
                    },
                    headerTintColor: '#fff',
                }}
            />
            <homeStack.Screen
                name="Global Charts"
                component={GlobalChartsScreen}
                options={{
                    title: 'Global Top 50 Today',
                    headerStyle: {
                        backgroundColor: '#090a0b',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <homeStack.Screen
                name="Recently Played"
                component={RecentlyPlayed}
                options={{
                    title: 'Recently Played',
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

export default OverviewStack;