import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
// import Track from '../components/track';
import { addToken } from '../actions/addToken';

const topStreams = ({ token, addToken, navigation }) => {

    const [isLoadedUser, setIsLoadedUser] = useState(false);
    const [user, setUser] = useState();
    // const [curPlaying, setCurPlaying] = useState(false);
    // const [recentlyPlayed, setRecentlyPlayed]= useState();
    // const [isLoadedRecentlyPlayed, setIsLoadedRecentlyPlayed]= useState(false);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.item.album.images[0].url);
            console.log('My Profile');
            console.log(response.data);
            setUser(response.data);
            setIsLoadedUser(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {isLoadedUser &&
                <View style={styles.userInfoContainer}>
                    {user.images[0].width ?
                        <Image style={styles.userIcon} source={{ uri: user.images[0].url, method: 'GET' }} />
                        : <Image style={styles.userIcon} source={require('../assets/user-icon.png')} />
                    }
                    <Text style={styles.userName}>{user.display_name}</Text>
                    <Text style={styles.followers}>{user.followers.total} followers</Text>
                    <Text style={styles.followers}>Email: {user.email}</Text>
                    <Text style={styles.followers}>Country: {user.country}</Text>
                </View>
            }
            <TouchableOpacity onPress={() => {
                navigation.navigate('Stats');
            }}>
                <Text style={styles.viewStats}>VIEW STATS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                addToken(null);
            }}>
                <Text style={styles.logOut}>LOG OUT</Text>
            </TouchableOpacity>
            <View style={styles.developerInfoContainer}>
                <Text style={styles.developerHeader}>Meet the Developer</Text>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.instagram.com/_aakashsolanki_/")
                }}>
                    <Text style={styles.viewInsta}>VIEW ON INSTAGRAM</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.linkedin.com/in/aakash-solanki22/")
                }}>
                    <Text style={styles.viewLN}>VIEW ON LINKEDIN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: '#090a0b',
    },
    playingStatusText: {
        color: 'white',
        padding: 4,
        fontSize: 18,
        fontWeight: 'bold'
    },
    userIcon: {
        borderRadius: 100,
        width: 200,
        height: 200
    },
    userInfoContainer: {
        alignItems: 'center'
    },
    userName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 10
    },
    followers: {
        color: 'white',
        fontSize: 15,
        margin: 10,
        marginTop: 0,
        marginBottom: 1
    },
    logOut: {
        backgroundColor: '#111',
        textAlign: 'center',
        color: 'white',
        padding: 7,
        borderRadius: 7,
        margin: 10,
        marginTop: 10,
    },
    viewStats: {
        backgroundColor: '#111',
        textAlign: 'center',
        color: 'white',
        padding: 7,
        borderRadius: 7,
        margin: 10,
        marginBottom: 0,
    },
    viewInsta: {
        backgroundColor: '#111',
        textAlign: 'center',
        color: 'white',
        padding: 7,
        borderRadius: 7,
        margin: 10,
        marginBottom: 0,
    },
    viewLN: {
        backgroundColor: '#111',
        textAlign: 'center',
        color: 'white',
        padding: 7,
        borderRadius: 7,
        margin: 10,
        marginBottom: 10,
    },
    developerHeader: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'center',
        marginBottom: 0
    },
    developerName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 0,
        textAlign: 'center',
        marginBottom: 5
    }
});

const mapStateToProps = state => ({
    token: state.token,
});

// const ActionCreators = Object.assign(
//     {},
//     addToken,
// );
// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(ActionCreators, dispatch),
// });

export default connect(mapStateToProps, { addToken })(topStreams)