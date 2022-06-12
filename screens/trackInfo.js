import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { addToken } from '../actions/addToken';
import { getLyrics } from 'genius-lyrics-api';
import {api_Key} from '../config.json';

const TrackInfoScreen = ({ token, addToken, route, navigation }) => {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const [trackInfo, setTrackInfo] = useState();
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [lyrics, setLyrics] = useState();
    const [lyricsLoaded, setLyricsLoaded] = useState(false);
    const [seeLyrics, setSeeLyrics] = useState(false);

    const [audioFeatures, setAudioFeatures] = useState();
    const [isLoadedAudioFeatures, setIsLoadedAudioFeatures] = useState(false);

    const reqURL = "https://api.spotify.com/v1/tracks/" + route.params.track_id;
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
            setTrackInfo(response.data);
            setInfoLoaded(true);
        }).catch((error) => {
            console.log("error", error.message);
        })
    }, []);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/audio-features/" + route.params.track_id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
        }).then((response) => {
            // console.log(response.data);
            setAudioFeatures(response.data);
            setIsLoadedAudioFeatures(true);
        }).catch((error) => {
            console.log("error in audio features", error.message);
        });
    }, []);

    useEffect(() => {
        if (trackInfo) {
            const options = {
                apiKey: api_Key,
                title: trackInfo.name,
                artist: trackInfo.artists[0].name,
                optimizeQuery: true
            }
            getLyrics(options)
                .then((lyrics) => {
                    // console.log(lyrics);
                    setLyrics(lyrics);
                    setLyricsLoaded(true);
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [trackInfo]);

    return (
        <View style={styles.container}>
            {infoLoaded &&
                <ScrollView>
                    <View style={styles.nameContainer}>
                        <Image style={styles.trackImage} source={{ uri: trackInfo.album.images[0].url }} />
                        <Text style={styles.trackName}>{trackInfo.name}</Text>
                        <Text style={styles.artistsName}>{trackInfo.artists.map(artist => artist.name).join(', ')}</Text>
                    </View>
                    <View style={styles.trackInfoContainer}>
                        <View style={styles.trackInfoPopularityContainer}>
                            <Text style={styles.popularity}>{trackInfo.popularity / 10}</Text>
                            <Text style={styles.popularityText}>0-10 popularity</Text>
                        </View>
                        <View style={styles.trackInfoPopularityContainer}>
                            <Text style={styles.popularity}>{millisToMinutesAndSeconds(trackInfo.duration_ms)}</Text>
                            <Text style={styles.popularityText}>Track duration</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.artistHeader}>Artists</Text>
                        {trackInfo.artists.map((item) => (
                            <TouchableOpacity onPress={() => navigation.navigate('artistInfoScreen', { artist_id: item.id })} key={item.id} style={styles.artistListContainer}>
                                <Text style={styles.artistListItem}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.artistHeader}>Audio Features</Text>
                    {isLoadedAudioFeatures ?
                        <View>
                            <View style={styles.trackInfoContainer}>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.acousticness * 100)}%</Text>
                                    <Text style={styles.popularityText}>Acoustic</Text>
                                </View>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.danceability * 100)}%</Text>
                                    <Text style={styles.popularityText}>Danceable</Text>
                                </View>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.energy * 100)}%</Text>
                                    <Text style={styles.popularityText}>Energetic</Text>
                                </View>
                            </View>
                            <View style={styles.trackInfoContainer}>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.instrumentalness * 100)}%</Text>
                                    <Text style={styles.popularityText}>Instrumental</Text>
                                </View>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.liveness * 100)}%</Text>
                                    <Text style={styles.popularityText}>Lively</Text>
                                </View>
                                <View style={styles.trackInfoPopularityContainer}>
                                    <Text style={styles.popularity}>{parseInt(audioFeatures.valence * 100)}%</Text>
                                    <Text style={styles.popularityText}>Valence</Text>
                                </View>
                            </View>
                        </View>
                        : <Text>Loading...</Text>}
                    <TouchableOpacity style={styles.toggleLyrics} onPress={() => { seeLyrics ? setSeeLyrics(false) : setSeeLyrics(true) }}>
                        {seeLyrics ? <Text style={styles.lyricsToggleButton}>Hide Lyrics</Text> : <Text style={styles.lyricsToggleButton}>See Lyrics</Text>}
                    </TouchableOpacity>
                    {lyricsLoaded ?
                        <View>
                            {seeLyrics && <Text style={styles.trackLyrics}>{lyrics}</Text>}
                        </View> :
                        <View>
                            {seeLyrics && <Text style={styles.trackLyrics}>Loading...</Text>}
                        </View>
                    }
                    <TouchableOpacity onPress={() => Linking.openURL("https://open.spotify.com/track/" + route.params.track_id)} style={styles.openInSpotifyContainer}>
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
    trackImage: {
        alignContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 3,
        margin: 10
    },
    trackName: {
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
    trackInfoContainer: {
        flexDirection: 'row',
        color: 'white',
        margin: 5,
        marginHorizontal: 10
    },
    trackInfoPopularityContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#111',
        borderRadius: 5,
        marginHorizontal: 7,
    },
    artistHeader: {
        color: 'white',
        fontSize: 22,
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
    trackLyrics: {
        color: 'white',
        fontSize: 16,
        padding: 10
    },
    toggleLyrics: {
        backgroundColor: '#03AC13',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 10,
        padding: 5
    },
    lyricsToggleButton: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 6
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

export default connect(mapStateToProps, { addToken })(TrackInfoScreen);