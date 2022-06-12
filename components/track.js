import React from 'react';
import {View, StyleSheet, Image, Text, FlatList}from 'react-native';

export default function Track({track_image, name, artists, duration}){
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }
    return(
        <View style={styles.container}>
            <Image style={styles.trackImage} source= {{uri: track_image}}/>
            <View style={styles.nameContainer}>
                <Text style={styles.trackName}>{name}</Text>
                <Text style={styles.artistsName}>{artists.map(a => a.name).join(', ')}</Text>
            </View>
            <Text style={styles.duration}>{millisToMinutesAndSeconds(duration)}</Text>
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        margin: 4,  
        borderRadius: 5,
        backgroundColor: '#111',
        alignItems: 'center'
    },
    trackImage: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    trackName: {
        color: 'white',
        flexShrink: 1,
        fontFamily: 'sans-serif',
        fontSize: 15
    },
    artistsName: {
        color: 'grey',
        fontSize: 12
    },
    nameContainer: {
        padding: 7,
        width: 260
    },
    duration: {
        color: 'grey',
        alignContent: 'flex-end'
    }
});