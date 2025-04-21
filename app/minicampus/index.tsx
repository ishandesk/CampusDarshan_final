import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Text,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';

export default function MiniCampus() {
  const router = useRouter();

  const handleOpenPhotoSphere = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot access media library');
        return;
      }

      const asset = Asset.fromModule(require('../../assets/images/mini1.jpg'));
      await asset.downloadAsync();

      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileUri = FileSystem.cacheDirectory + 'mini_photo.jpg';
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await MediaLibrary.createAssetAsync(fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Open Mini Campus 360 with...',
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
    <ImageBackground
      source={require('../../assets/images/delhi.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* GROUND BUTTON */}
      <TouchableOpacity
        style={styles.groundButton}
        onPress={() => router.push('/ground')}
      >
        <Text style={styles.groundButtonText}>Ground</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Button title="Mini Campus" onPress={handleOpenPhotoSphere} />

        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => router.push('minicampus/mini2')}>
            <Image source={require('../../assets/images/forward.png')} style={styles.arrow} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('minicampus/mini3')}>
            <Image source={require('../../assets/images/right.png')} style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 30,
  },
  arrow: {
    width: 50,
    height: 50,
    tintColor: 'black',
  },
  groundButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 1,
  },
  groundButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
