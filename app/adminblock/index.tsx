import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';

export default function AdminBlock() {
  const handleOpenPhotoSphere = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot access media library');
        return;
      }

      // 1. Load asset and convert to base64
      const asset = Asset.fromModule(require('../../assets/images/three.jpg'));
      await asset.downloadAsync();

      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 2. Write to cache directory
      const fileUri = FileSystem.cacheDirectory + 'photo_sphere.jpg';
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3. Save to gallery
      await MediaLibrary.createAssetAsync(fileUri);

      // 4. Share via system sheet
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Open 360 Image with...',
        });
      } else {
        Alert.alert('Not supported', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Error', error.message || 'Could not open 360 photo.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open 360 Photo (Choose App)" onPress={handleOpenPhotoSphere} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
