import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Track from '../components/track';
import Card from '../components/card';
import { addToken } from '../actions/addToken';

const Home = ({ token, addToken, navigation }) => {

    const [isLoadedLastTrack, setIsLoadedLastTrack] = useState(false);
    const [lastTrack, setLastTrack] = useState();
    const [curPlaying, setCurPlaying] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState();
    const [isLoadedRecentlyPlayed, setIsLoadedRecentlyPlayed] = useState(false);

    const [topArtists, setTopArtists] = useState();
    const [isLoadedTopArtists, setIsLoadedTopArtists] = useState(true);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/me/player/currently-playing", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.item.album.images[0].url);
            if (response.data.is_playing) {
                setCurPlaying(true);
                setLastTrack(response.data.item);
                setIsLoadedLastTrack(true);
            }
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/me/top/artists?limit=9&time_range=short_term", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            console.log(response.data.items[0]);
            setTopArtists(response.data.items);
            setIsLoadedTopArtists(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/me/player/recently-played?limit=20", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.items[1   ]);
            setRecentlyPlayed(response.data.items);
            setIsLoadedRecentlyPlayed(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);

    return (
        <View style={styles.container}>

            {curPlaying ?
                <Text style={styles.playingStatusText}>Currently Playing:</Text> :
                <Text style={styles.playingStatusText}>Last Played</Text>
            }
            {curPlaying ? isLoadedLastTrack && <Track
                track_image={lastTrack.album.images[0].url}
                name={lastTrack.name}
                artists={lastTrack.artists}
                duration={lastTrack.duration_ms}
            /> : isLoadedRecentlyPlayed &&
            <Track
                track_image={recentlyPlayed[0].track.album.images[0].url}
                name={recentlyPlayed[0].track.name}
                artists={recentlyPlayed[0].track.artists}
                duration={recentlyPlayed[0].track.duration_ms}
            />
            }
            <TouchableOpacity onPress={() => navigation.navigate('Global Charts')} style={styles.openInSpotifyContainer}>
                <Text style={styles.openInSpotify}>
                    See Global Top 50 Today
                </Text>
            </TouchableOpacity>
            
            <View style={styles.recentlyPlayedContainer}>
                <View style={styles.seeAllContainer}>
                    <Text style={styles.topArtistsHeader}>Recently Played Tracks</Text>
                    <TouchableOpacity style={styles.seeAllTextContainer} onPress={() => navigation.navigate('Recently Played')}>
                        <Text style={styles.seeAllTextRP}>More</Text>
                    </TouchableOpacity>
                </View>
                {isLoadedRecentlyPlayed &&
                    <FlatList
                        style={styles.recentlyPlayedTracks}
                        data={recentlyPlayed}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('trackInfoScreen', { track_id: item.track.id })}>
                                <Track
                                    duration={item.track.duration_ms}
                                    name={item.track.name}
                                    track_image={item.track.album.images[0].url}
                                    artists={item.track.artists}
                                />
                            </TouchableOpacity>
                        )}
                    />
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        backgroundColor: '#090a0b'
    },
    playingStatusText: {
        color: 'white',
        padding: 4,
        fontSize: 20,
        fontWeight: 'bold'
    },
    seeAllContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    seeAllText: {
        color: 'white',
        textAlign: 'right',
        fontSize: 12,
        marginLeft: 70
    },
    topArtistsHeader: {
        color: 'white',
        padding: 4,
        fontSize: 20,
        fontWeight: 'bold',
    },
    openInSpotifyContainer: {
        alignItems: 'center',
        backgroundColor: '#111',
        margin: 4,
        borderRadius: 5
    },
    openInSpotify: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 6,
    },
    seeAllTextRP: {
        color: 'white',
        textAlign: 'right',
        fontSize: 12,
        marginLeft: 125
    },
    recentlyPlayedTracks: {
        marginBottom: 200
    },
    topArtistList: {

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

export default connect(mapStateToProps, { addToken })(Home)