import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from '../components/card';
import { addToken } from '../actions/addToken';

const topStreams = ({ token, addToken, navigation }) => {

    const [isLoadedTopList, setIsLoadedTopList] = useState(false);
    const [TopList, setTopList] = useState();
    const [timeDuration, setTimeDuration] = useState('medium_term');
    const [typeOfData, setTypeOfData] = useState('artists');
    // const [recentlyPlayed, setRecentlyPlayed]= useState();
    // const [isLoadedRecentlyPlayed, setIsLoadedRecentlyPlayed]= useState(false);

    useEffect(() => {
        const reqURL = 'https://api.spotify.com/v1/me/top/' + typeOfData + '?limit=50&time_range=' + timeDuration;
        axios(
            reqURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.items);
            setTopList(response.data.items);
            setIsLoadedTopList(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, [typeOfData, timeDuration]);

    return (
        <View style={styles.container}>
            <View style={styles.timeParameterContainer}>
                <TouchableOpacity onPress={() => {setIsLoadedTopList(false);setTimeDuration('short_term')}}>
                    {timeDuration === 'short_term' ?
                        <Text style={styles.timeParameterTextSelected}>4 weeks</Text> :
                        <Text style={styles.timeParameterText}>4 weeks</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setIsLoadedTopList(false);setTimeDuration('medium_term')}}>
                    {timeDuration === 'medium_term' ?
                        <Text style={styles.timeParameterTextSelected}>6 months</Text> :
                        <Text style={styles.timeParameterText}>6 months</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setIsLoadedTopList(false);setTimeDuration('long_term')}}>
                    {timeDuration === 'long_term' ?
                        <Text style={styles.timeParameterTextSelected}>lifetime</Text> :
                        <Text style={styles.timeParameterText}>lifetime</Text>
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                {isLoadedTopList &&
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={TopList}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={typeOfData === 'tracks'? () => navigation.navigate('trackInfoScreen', {track_id: item.id}): () => navigation.navigate('artistInfoScreen', {artist_id: item.id})}>
                                <Card
                                    name={item.name}
                                    track_image={typeOfData === 'tracks' ? item.album.images[0].url : item.images[0].url}
                                    sno={item.index}
                                />
                            </TouchableOpacity>
                        )}
                    />
                }
            </View>

            <View style={styles.choiceParameterContainer}>
                <TouchableOpacity onPress={() => {setIsLoadedTopList(false);setTypeOfData('artists')}}>
                    {typeOfData === 'artists' ?
                        <Text style={styles.choiceParameterTextSelected}>Artists</Text> :
                        <Text style={styles.choiceParameterText}>Artists</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setIsLoadedTopList(false);setTypeOfData('tracks');}}>
                    {typeOfData === 'tracks' ?
                        <Text style={styles.choiceParameterTextSelected}>Tracks</Text> :
                        <Text style={styles.choiceParameterText}>Tracks</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#090a0b'
    },
    playingStatusText: {
        color: 'white',
        padding: 4,
        fontSize: 18,
        fontWeight: 'bold'
    },
    listContainer: {
        marginBottom: 60
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
    choiceParameterContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'black',
        width: '100%'
    },
    choiceParameterText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        marginHorizontal: 66,
    },
    choiceParameterTextSelected: {
        color: '#03AC13',
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        marginHorizontal: 66,
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