import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from 'react-native';


import axios from "axios";


export default class IssLocationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        };
    }

    componentDidMount() {

      setInterval(this.getIssLocation,500);
    }

    getIssLocation = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")

            .then((response) => {
              console.log(response)
               console.log(response.data)
                this.setState({ location: response.data })
            })

            .catch((error) => {
                Alert.alert(error.message)
            })
    }

    render() {
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Localização da EEI</Text>
                        </View>
                        <View style={styles.mapContainer}>
                            
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitude(KM): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Velocidade(KM/H): {this.state.location.velocity}</Text>
                            
                        </View>
                    </ImageBackground>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 10,
        color: "black",
        fontWeight: "bold"
    }
})