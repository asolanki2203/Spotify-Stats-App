import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Track from '../components/track';
import { addToken } from '../actions/addToken';

const topStreams = ({ token, addToken, navigation }) => {

    const [isLoadedTop50, setIsLoadedTop50] = useState(false);
    const [top50, setTop50] = useState();
    // const [curPlaying, setCurPlaying] = useState(false);
    // const [recentlyPlayed, setRecentlyPlayed]= useState();
    // const [isLoadedRecentlyPlayed, setIsLoadedRecentlyPlayed]= useState(false);

    useEffect(() => {
        axios(
            "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            // console.log(response.data.tracks.items[0].track);
            setTop50(response.data.tracks.items);
            setIsLoadedTop50(true);
        }).catch((error) => {
            console.log("error", error.message);
        });
    }, []);

    return (
        <View style={styles.container}>
            {isLoadedTop50 &&
                <FlatList
                    data={top50}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('trackInfoScreen', {track_id: item.track.id})}>
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