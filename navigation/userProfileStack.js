import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import userProfileScreen from '../screens/userProfile';
import TrackInfoScreen from '../screens/trackInfo';
import artistInfoScreen from '../screens/artistInfo';

const homeStack = createNativeStackNavigator();
const UserProfileStack = () => {
    return (
        <homeStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <homeStack.Screen
                name="User Profile"
                component={userProfileScreen}
                options={{
                    title: 'User Profile',
                    headerStyle: {
                        backgroundColor: '#090a0b',
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

export default UserProfileStack;