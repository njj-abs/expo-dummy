import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as ExpoLocation from 'expo-location';

const statusData = {
    granted: async (context) => {
        const location = await ExpoLocation.getCurrentPositionAsync({
            accuracy: ExpoLocation.Accuracy.BestForNavigation,
        });
        context.setState({
            ...context.state,
            location: { data: location },
        });
    },
    denied: async (context) => context.setState({
        ...context.state,
        location: { error: 'Permission to access location was denied' },
    }),
};

const Location = (context) => {
    const { state: { location: { data, error } } } = context;

    useEffect(() => {
        (async () => {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            await statusData[status](context);

        })();
    }, []);

    return (
        <View>
            <Text >{JSON.stringify(error ? error : data)}</Text>
            { data !== 'loading' && <MapView style={styles.map}
                initialRegion={{
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} >
                <Marker coordinate={{
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                }}></Marker>
            </MapView>}
        </View>
    )
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '80%',
    },
});

export default Location