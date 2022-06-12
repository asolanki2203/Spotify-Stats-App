import React from "react";
import { View, StyleSheet, Text, Button, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Store from '../store/configureStore';
import { ResponseType, useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { connect } from 'react-redux';
import { addToken } from '../actions/addToken';
import {client_id} from '../config.json';
// import { useSelector, useDispatch } from "react-redux";
// import * as tokenAction from "../store/actions/token";
// import axios from "axios";
// import * as songAction from "../store/actions/topSongs";

const discovery = {
  authorizationEndpoint:
    "https://accounts.spotify.com/authorize",
  tokenEndpoint:
    "https://accounts.spotify.com/api/token",
};

const Login = ({ navigation, token, addToken }) => {
  // const dispatch = useDispatch();
  //   const [token, setToken] = useState("");
  const [request, response, promptAsync] =
    useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId: client_id,
        scopes: [
          "user-read-currently-playing",
          "user-read-recently-played",
          "user-read-playback-state",
          "user-top-read",
          "user-modify-playback-state",
          "streaming",
          "user-read-email",
          "user-read-private",
        ],
        // In order to follow the "Authorization Code Flow" 
        // to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: makeRedirectUri({ native: 'spotify-stats-asolanki22://' }),
      },
      discovery
    );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log('doosra log                       ' + access_token);
      addToken(access_token);
    }
  }, [response]);


  // Store.subscribe(() => {
  //   console.log('from subscription    	            ' + token);
  // })
  useEffect(() => {
    // if (token) {
    //   navigation.replace("Home");

    // axios(
    //   "https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   .then((response) => {
    //     dispatch(songAction.addTopSongs(response));
    //   })
    //   .catch((error) => {
    //     console.log("error", error.message);
    //   });
    // setTimeout(
    //   () =>
    //     navigation.replace("Home", {
    //       token: token,

    //     }),
    //   500
    // );
    // dispatch(tokenAction.addToken(token));
    // }
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.headingText}>Spotify Stats</Text>
      <Text style={styles.paraText}>Please login with your spotify account to continue</Text>
      <TouchableOpacity onPress={() => {
        promptAsync();
      }}>
        <Text style={styles.login}>LOG IN WITH SPOTIFY</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  paraText: {
    color: 'grey',
    fontSize: 18,
    marginTop: 4,
    marginHorizontal: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  login: {
    backgroundColor: '#03AC13',
    textAlign: 'center',
    color: 'white',
    padding: 7,
    borderRadius: 7,
    margin: 10,
    marginTop: 0,
    width: 360,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, { addToken })(Login)