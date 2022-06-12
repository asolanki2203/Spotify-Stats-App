import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Track from '../components/track';
import Card from '../components/card'
import { addToken } from '../actions/addToken';

const topStreams = ({ token, addToken, navigation }) => {

    const [searchQuery, setSearchQuery] = useState();
    const [typeOfData, setTypeOfData] = useState('artist');
    const [searchResults, setSearchResults] = useState();
    const [isLoadedSearchResults, setIsLoadedSearchResults] = useState(false);
    // const [recentlyPlayed, setRecentlyPlayed]= useState()

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/search?limit=9&q=" + searchQuery + "&type=" + typeOfData, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.artists.items[0]);
            if(typeOfData === 'track'&&searchQuery){
                setSearchResults(response.data.tracks.items);
                setIsLoadedSearchResults(true);
            }
            else if(typeOfData === 'artist'&&searchQuery){
                console.log(isLoadedSearchResults);
                // console.log(searchResults[0]);
                
                setSearchResults(response.data.artists.items);
                // console.log(response.data.artists.items[0]);/
                
                setIsLoadedSearchResults(true);
            } 
        }).catch((error) => {
            console.log("error from search", error.message);
        });
    }, [searchQuery, typeOfData]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchField}
                placeholder="Search for tracks or artists"
                placeholderTextColor="grey"
                returnKeyType={'search'}
                onSubmitEditing={(event) => {console.log('tap   ');setIsLoadedSearchResults(false);setSearchQuery(event.nativeEvent.text)}}
                multiline={false}
            />

            <View style={styles.timeParameterContainer}>
                <TouchableOpacity onPress={() => { setIsLoadedSearchResults(false);setTypeOfData('track');  }}>
                    {typeOfData === 'track' ?
                        <Text style={styles.timeParameterTextSelected}>Tracks</Text> :
                        <Text style={styles.timeParameterText}>Tracks</Text>
                    }
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => { setIsLoadedSearchResults(false);setTypeOfData('artist');  }}>
                    {typeOfData === 'artist' ?
                        <Text style={styles.timeParameterTextSelected}>Artists</Text> :
                        <Text style={styles.timeParameterText}>Artists</Text>
                    } 
                </TouchableOpacity>
            </View> 
            <View style={styles.listContainer}> 
                {isLoadedSearchResults  && 
                    <FlatList
                        data={searchResults}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={typeOfData === 'track' ? () => navigation.navigate('trackInfoScreen', { track_id: item.id }): ()=>navigation.navigate('artistInfoScreen', { artist_id: item.id })}>
                                {{item} &&  
                                <Card
                                    name={item.name}
                                    track_image={typeOfData === 'track' ? item.album.images[0].url : item.images[0].url}
                                    sno={item.index}
                                />}
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
        fontSize: 18,
        fontWeight: 'bold'
    },
    searchField: {
        color: 'white',
        backgroundColor: '#111',
        padding: 6,
        borderRadius: 5,
        margin: 5
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
        marginHorizontal: 66
    },
    timeParameterTextSelected: {
        color: '#03AC13',
        fontSize: 18,
        textAlign: 'center',
        margin: 3,
        marginHorizontal: 66
    },
    listContainer: {
        marginBottom: 90
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