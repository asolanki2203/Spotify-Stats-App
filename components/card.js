import React from 'react';
import {View, StyleSheet, Image, Text, FlatList}from 'react-native';

export default function Track({track_image, name, sno}){
    return(
        <View style={styles.container}>
            <Image style={styles.trackImage} source= {{uri: track_image}}/>
            <View style={styles.nameContainer}>
                <Text style={styles.sno}>{sno}</Text>
                <Text style={styles.trackName}>{name}</Text>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        height: 150,
        width: 120,
        margin: 4,  
        borderRadius: 5,
        backgroundColor: '#111',
        alignItems: 'center'
    },
    trackImage: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    nameContainer: {
        flexDirection: 'row'
    },
    trackName: {
        color: 'white',
        flexShrink: 1,
        fontFamily: 'sans-serif',
        fontSize: 15,
        padding: 0
    },
    sno: {
        color: 'grey',
        fontSize: 15
    }
});