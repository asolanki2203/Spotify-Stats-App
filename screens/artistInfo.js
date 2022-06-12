import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { addToken } from '../actions/addToken';

const ArtistInfoScreen = ({ token, addToken, route }) => {
    // console.log(route.params.artist_id);
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const [artistInfo, setartistInfo] = useState();
    const [infoLoaded, setInfoLoaded] = useState(false);
    // console.log(route.params.artist_id);
    const reqURL = "https://api.spotify.com/v1/artists/" + route.params.artist_id;
    // console.log(reqURL);
    useEffect(() => {
        axios(
            reqURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
        }).then((response) => {
            console.log(response.data.genres);
            setartistInfo(response.data);
            setInfoLoaded(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);
    

    return (
        <View style={styles.container}>
            {infoLoaded &&
                <ScrollView>
                    <View style={styles.nameContainer}>
                        <Image style={styles.artistImage} source={{ uri: artistInfo.images[0].url }} />
                        <Text style={styles.artistName}>{artistInfo.name}</Text>
                    </View>
                    <View style={styles.artistInfoContainer}>
                        <View style={styles.artistInfoPopularityContainer}>
                            <Text style={styles.popularity}>{artistInfo.popularity / 10}</Text>
                            <Text style={styles.popularityText}>0-10 popularity</Text>
                        </View>
                        <View style={styles.artistInfoPopularityContainer}>
                            <Text style={styles.popularity}>{artistInfo.followers.total}</Text>
                            <Text style={styles.popularityText}>Followers</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.artistHeader}>Genres</Text>
                        <Text style={styles.artistGenre}>{artistInfo.genres.join(', ')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL("https://open.spotify.com/artist/" + route.params.artist_id)} style={styles.openInSpotifyContainer}>
                        <Text style={styles.openInSpotify}>
                            Open in <Image style={styles.spotifyLogo} source={require('../assets/spotify-logo.png')} />
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: '#090a0b',
    },
    nameContainer: {
        alignItems: 'center',
    },
    artistImage: {
        alignContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 3,
        margin: 10
    },
    artistName: {
        color: 'white',
        fontSize: 22,
        alignItems: 'center',
        textAlign: 'center'
    },
    artistsName: {
        color: 'grey',
        textAlign: 'center'
    },
    popularity: {
        color: '#47bd60',
        fontWeight: 'bold',
        fontSize: 19
    },
    popularityText: {
        color: 'white',
    },
    artistInfoContainer: {
        flexDirection: 'row',
        color: 'white',
        margin: 15,
        marginHorizontal: 20
    },
    artistInfoPopularityContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#111',
        borderRadius: 5,
        marginHorizontal: 7,
    },
    artistHeader: {
        color: 'white',
        fontSize: 19,
        margin: 5,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    artistListContainer: {
        alignItems: 'center',
        backgroundColor: '#111',
        margin: 5,
        marginHorizontal: 10,
    },
    artistListItem: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        textAlign: 'center'
    },
    openInSpotifyContainer: {
        alignItems: 'center',
        backgroundColor: '#03AC13',
        margin: 10,
        borderRadius: 5
    },
    openInSpotify: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 6,
        paddingTop: 0,
        paddingBottom: 8
    },
    spotifyLogo: {
        width: 115,
        height: 35,
    },
    artistGenre: {
        color: 'white',
        backgroundColor: '#111',
        padding: 2,
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 20
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

export default connect(mapStateToProps, { addToken })(ArtistInfoScreen);