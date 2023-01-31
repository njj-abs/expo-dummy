import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const ShareButton = () => {
  const [state, setState] = useState();
  const fileUri = FileSystem.cacheDirectory + "test.txt";
  const text = 'Hello';

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{state}</Text>
      <Button
        title="Available?"
        onPress={async () => {
          const available = await Sharing.isAvailableAsync();

          available
            ? setState("Sharing is available")
            : setState("Sharing is NOT available");
        }}
      />
      <Button
        title="Share"
        onPress={async () => {
          await FileSystem.writeAsStringAsync(fileUri, text);
          await Sharing.shareAsync(fileUri);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShareButton;
