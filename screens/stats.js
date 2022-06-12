import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '../components/card';
import { BarChart, Grid } from 'react-native-svg-charts'
import { addToken } from '../actions/addToken';

const topStreams = ({ token, addToken, navigation }) => {

    const [audioData, setAudioData] = useState({});
    const [isProcessedTrack, setIsProcessedTrack] = useState(false);
    const [genreData, setGenreData] = useState();
    const [isProcessedGenre, setIsProcessedGenre] = useState(false);
    const [timeDuration, setTimeDuration] = useState('medium_term');

    const [topTracks, setTopTracks] = useState();
    const [isLoadedTopTracks, setIsLoadedTopTracks] = useState(false);
    const [topArtists, setTopArtists] = useState();
    const [isLoadedTopArtists, setIsLoadedTopArtists] = useState(false);

    useEffect(() => {
        const reqURL = 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=' + timeDuration;
        axios(
            reqURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setTopTracks(response.data.items.slice(0, 3));
            setIsLoadedTopTracks(true);
            //processing
            let reqString = "";
            response.data.items.map((track) => (
                reqString += track.id + ","
            ));
            // console.log(reqString.slice(0, -1));
            axios(
                "https://api.spotify.com/v1/audio-features?ids=" + reqString.slice(0, -1), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
            }).then((response) => {
                // console.log(trackStats(response.data.audio_features));
                setAudioData(trackStats(response.data.audio_features));
                setIsProcessedTrack(true);
            }).catch((error) => {
                console.log("error in audio features", error.message);
            });
        }).catch((error) => {
            console.log("error gen", error.message);
        });
    }, [timeDuration]);

    useEffect(() => {
        const reqURL = 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=' + timeDuration;
        axios(
            reqURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setTopArtists(response.data.items.slice(0, 3));
            setIsLoadedTopArtists(true);
            setGenreData(genreStats(response.data.items.map(item => item.genres)));
            setIsProcessedGenre(true);
        }).catch((error) => {
            console.log("error gen", error.message);
        });
    }, [timeDuration]);
    return (
        <View style={styles.container}>
            <View style={styles.timeParameterContainer}>
                <TouchableOpacity onPress={() => { setIsLoadedTopArtists(false); setIsLoadedTopTracks(false); setIsProcessedTrack(false); setIsProcessedGenre(false); setTimeDuration('short_term') }}>
                    {timeDuration === 'short_term' ?
                        <Text style={styles.timeParameterTextSelected}>4 weeks</Text> :
                        <Text style={styles.timeParameterText}>4 weeks</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsLoadedTopArtists(false); setIsLoadedTopTracks(false); setIsProcessedTrack(false); setIsProcessedGenre(false); setTimeDuration('medium_term') }}>
                    {timeDuration === 'medium_term' ?
                        <Text style={styles.timeParameterTextSelected}>6 months</Text> :
                        <Text style={styles.timeParameterText}>6 months</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsLoadedTopArtists(false); setIsLoadedTopTracks(false); setIsProcessedTrack(false); setIsProcessedGenre(false); setTimeDuration('long_term') }}>
                    {timeDuration === 'long_term' ?
                        <Text style={styles.timeParameterTextSelected}>lifetime</Text> :
                        <Text style={styles.timeParameterText}>lifetime</Text>
                    }
                </TouchableOpacity>
            </View>

            <ScrollView>

                <Text style={styles.genresHeader}>Genres</Text>
                {isProcessedGenre ?
                    <View>
                        <View style={styles.genreDetailsContainer}>
                            <View style={styles.genreNameContainer}>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[0])}</Text>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[1])}</Text>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[2])}</Text>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[3])}</Text>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[4])}</Text>
                                <Text style={styles.genreName}>{CFL(genreData.sortedArray[5])}</Text>
                            </View>
                            <BarChart
                                horizontal={true}
                                spacingInner={0.1}
                                spacingOuter={0.1}
                                style={styles.genreGraphContainer}
                                gridMin={0}
                                gridMax={genreData.frequency[genreData.sortedArray[0]] * 1.3}
                                data={genreData.sortedArray.map(item => genreData.frequency[item]).slice(0, 6)}
                                svg={{ fill: '#47bd60' }}
                                contentInset={{ top: 0, bottom: 10, left: 4, right: 4 }}>
                            </BarChart>
                        </View>

                        <Text style={styles.genresHeader}>Your Favourite Genres</Text>
                        <View style={styles.trackInfoContainer}>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{CFL(genreData.sortedArray[0])}</Text>
                                <Text style={styles.popularityText}>{genreData.frequency[genreData.sortedArray[0]]} out of your 50 top artists</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{CFL(genreData.sortedArray[1])}</Text>
                                <Text style={styles.popularityText}>{genreData.frequency[genreData.sortedArray[1]]} out of your 50 top artists</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{CFL(genreData.sortedArray[2])}</Text>
                                <Text style={styles.popularityText}>{genreData.frequency[genreData.sortedArray[2]]} out of your 50 top artists</Text>
                            </View>
                        </View>
                    </View> : <Text style={styles.popularityText}>Loading...</Text>
                }
                <Text style={styles.genresHeader}>Your Top 3 Artists</Text>
                <View>
                    {isLoadedTopArtists ?
                        <View style={styles.topArtistContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('artistInfoScreen', { artist_id: topArtists[0].id })}>
                                <Card
                                    name={topArtists[0].name}
                                    track_image={topArtists[0].images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('artistInfoScreen', { artist_id: topArtists[0].id })}>
                                <Card
                                    name={topArtists[1].name}
                                    track_image={topArtists[1].images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('artistInfoScreen', { artist_id: topArtists[0].id })}>
                                <Card
                                    name={topArtists[2].name}
                                    track_image={topArtists[2].images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>
                        </View> : <Text style={styles.popularityText}>Loading...</Text>
                    }
                </View>
                <Text style={styles.genresHeader}>Your Top 3 Tracks</Text>
                <View>
                    {isLoadedTopTracks ?
                        <View style={styles.topArtistContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('trackInfoScreen', { track_id: topTracks[0].id })}>
                                <Card

                                    name={topTracks[0].name}
                                    track_image={topTracks[0].album.images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('trackInfoScreen', { track_id: topTracks[1].id })}>
                                <Card
                                    name={topTracks[1].name}
                                    track_image={topTracks[1].album.images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('trackInfoScreen', { track_id: topTracks[1].id })}>
                                <Card
                                    name={topTracks[2].name}
                                    track_image={topTracks[2].album.images[0].url}
                                    sno={topArtists.sno}
                                />
                            </TouchableOpacity>
                        </View> : <Text style={styles.popularityText}>Loading...</Text>
                    }
                </View>
                <Text style={styles.genresHeader}>Audio Insights</Text>
                {isProcessedTrack ?
                    <View>
                        <View style={styles.trackInfoContainer}>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.acousticness}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Acoustic</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.danceability}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Danceable</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.energy}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Energetic</Text>
                            </View>
                        </View>
                        <View style={styles.trackInfoContainer}>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.speechiness}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Speechful</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.instrumentalness}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Instrumental</Text>
                            </View>
                            <View style={styles.trackInfoPopularityContainer}>
                                <Text style={styles.popularity}>{audioData.liveness}%</Text>
                                <Text style={styles.popularityText}>of your top tracks are Lively</Text>
                            </View>
                        </View>
                    </View> : <Text style={styles.popularityText}>Loading...</Text>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#090a0b'
    },
    popularity: {
        color: '#47bd60',
        fontWeight: 'bold',
        fontSize: 18
    },
    popularityText: {
        color: 'white',
        fontSize: 13
    },
    trackInfoContainer: {
        flexDirection: 'row',
        color: 'white',
        margin: 5,
        marginHorizontal: 0
    },
    trackInfoPopularityContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#111',
        borderRadius: 5,
        marginHorizontal: 2,
    },
    genresHeader: {
        fontSize: 18,
        color: 'white',
        margin: 5,
        fontWeight: 'bold'
    },
    genreDetailsContainer: {
        flexDirection: 'row',
        height: 200
    },
    genreGraphContainer: {
        flex: 3,
        height: 200
    },
    genreNameContainer: {
        flex: 1
    },
    genreName: {
        color: 'white',
        padding: 6.7,
        flexShrink: 1,
        fontSize: 13,
        height: 32
    },
    timeParameterContainer: {
        flexDirection: 'row',
        backgroundColor: '#000',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    timeParameterText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        margin: 3,
        marginHorizontal: 28
    },
    timeParameterTextSelected: {
        color: '#03AC13',
        fontSize: 18,
        textAlign: 'center',
        margin: 3,
        marginHorizontal: 28
    },
    topArtistContainer: {
        flexDirection: 'row'
    }
});


const trackStats = (audioData) => {
    const param = 0.4;
    let acousticness = 0, danceability = 0, energy = 0, instrumentalness = 0, liveness = 0, speechiness = 0;
    for (let i = 0; i < audioData.length; i++) {
        if (audioData[i].acousticness >= param) acousticness++;
        if (audioData[i].danceability >= 0.5) danceability++;
        if (audioData[i].energy >= 0.5) energy++;
        if (audioData[i].instrumentalness >= param) instrumentalness++;
        if (audioData[i].liveness >= param) liveness++;
        if (audioData[i].speechiness >= param) speechiness++;
    }
    let n = audioData.length;
    // console.log(instrumentalness);
    const ans = {
        acousticness: parseInt((acousticness / n) * 100),
        danceability: parseInt((danceability / n) * 100),
        energy: parseInt((energy / n) * 100),
        instrumentalness: parseInt((instrumentalness / n) * 100),
        liveness: parseInt((liveness / n) * 100),
        speechiness: parseInt((speechiness / n) * 100),
    };
    // console.log(ans);
    return ans;
}

const genreStats = (genreData) => {
    let genArray = [];
    for (let i = 0; i < genreData.length; i++) {
        genArray = genArray.concat(genreData[i]);
    }
    // console.log(genArray);
    return sortByFrequencyAndMakeObject(genArray);
}

function sortByFrequencyAndMakeObject(array) {
    let frequency = {}, value;

    // compute frequencies of each value
    for (let i = 0; i < array.length; i++) {
        value = array[i];
        if (value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }

    let uniques = [];
    for (value in frequency) {
        uniques.push(value);
    }

    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }

    return { sortedArray: uniques.sort(compareFrequency), frequency };
}

function CFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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