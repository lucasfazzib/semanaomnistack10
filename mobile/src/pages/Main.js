 import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
 import MapView, { Marker, Callout } from 'react-native-maps';
 import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

 function Main(){
    const [currentRegion, serCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialLocation(){
            const { granted } = await requestPermissionsAsync();
        
            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;

                serCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialLocation();
    }, []);

    if (!currentRegion){
        return null;
    }
     return (
     <MapView initialRegion={currentRegion} style={styles.map}>
         <Marker coordinate={{ latitude: -23.5639837, longitude: -46.6986386}}>
            <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/9930662?s=460&v=4' }}/>
            <Callout >
                <View style={styles.callout}>
                    <Text style={styles.devName}> Lucas Fazzi</Text>
                    <Text style={styles.devBio}> Developer, Gamer, CyberSecurity Enthusiast </Text>
                    <Text style={styles.devTechs}> ReactJS, React Native, Node.js</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
     )
 }

 const styles = StyleSheet.create({
     map: {
         flex: 1
     },

     avatar: {
         width: 54,
         height: 54,
         borderRadius: 4,
         borderWidth: 4,
         borderColor: '#FFF'
     },

     callout: {
         width: 260,
     },

     devName: {
         fontWeight: 'bold',
         fontSize: 16,
     },

     devBio: {
         color: '#666',
         marginTop: 5,
     },

     devTechs: {
        marginTop: 5,
     },
 })

 export default Main;