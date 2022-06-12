import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import LoginScreen from '../screens/login';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
// import Store from '../store/configureStore';
import OverviewStack from './overviewStack';
import TopStack from './topStack';
import SearchStack from './searchStack';
import UserProfileStack from './userProfileStack';
import statsStack from './statsStack'
// import { connect } from 'react-redux';

const homeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// console.log('From Navigator     '+Store.getState().token);

const homeNavigator = ({ token }) => {
    return (
        <NavigationContainer>
            {token == null ? (
                <homeStack.Navigator>
                    <homeStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: '',
                            headerStyle: {
                                backgroundColor: '#090a0b',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {

                            },
                        }}
                    />
                </homeStack.Navigator>
            ) : (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === 'Overview') {
                                iconName = focused
                                    ? 'md-home'
                                    : 'ios-home-outline';
                            } else if (route.name === 'Top') {
                                iconName = focused ? 'trending-up' : 'trending-up';
                            } else if (route.name === 'Search') {
                                return <Ionicons name="search" size={24} color={color} />
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'user-alt' : 'user';
                                return <FontAwesome5 name={iconName} size={24} color={color} />
                            } else if (route.name === 'Stats') {
                                iconName = focused ? 'trending-up' : 'trending-up';
                                return <MaterialIcons name="leaderboard" size={24} color={color} />
                            } 

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={24} color={color} />;
                        },
                        tabBarActiveTintColor: '#03AC13',
                        tabBarInactiveTintColor: 'white',
                        tabBarStyle: {height: 50},
                        tabBarActiveBackgroundColor: 'black',
                        tabBarInactiveBackgroundColor: 'black',
                        tabBarHideOnKeyboard: 'true'
                    })}
                >
                    <Tab.Screen name="Overview" component={OverviewStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Top" component={TopStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Search" component={SearchStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Stats" component={statsStack} options={{ headerShown: false }} />
                    <Tab.Screen name="Profile" component={UserProfileStack} options={{ headerShown: false }} />
                </Tab.Navigator>
            )
            }
        </NavigationContainer>
    );
}

const mapStateToProps = state => ({
    token: state.token,
});



export default connect(mapStateToProps)(homeNavigator);