import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const schedulePushNotification = async ({ body }) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: body,
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

const registerForPushNotificationsAsync = async () => {
    Platform.OS === 'android' &&
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    const { status } = existingStatus !== 'granted' &&
        await Notifications.requestPermissionsAsync();
        
    if (existingStatus !== 'granted' && status !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    const { data } = (await Notifications.getExpoPushTokenAsync());
    console.log(data);

    return data;
}

const Notification = (context) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        (async () => {
            const token = await registerForPushNotificationsAsync();
            setExpoPushToken(token);

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log({ response });
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        })();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Open Tab one"
                onPress={async () => {
                    await schedulePushNotification({ body: 'Opened Tab one' });
                }}
            />
            <Button
                title="Open Tab two"
                onPress={async () => {
                    await schedulePushNotification({ body: 'Opened Tab two' });
                }}
            />
        </View>
    );
}

export default Notification
