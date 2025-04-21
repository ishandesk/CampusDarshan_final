import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';

export default function Mini2() {
  const router = useRouter();

  const handleOpenPhotoSphere = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot access media library');
        return;
      }

      const asset = Asset.fromModule(require('../../assets/images/admin3.jpg'));
      await asset.downloadAsync();

      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileUri = FileSystem.cacheDirectory + 'admin3_view.jpg';
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await MediaLibrary.createAssetAsync(fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Open 360 Image with...',
        });
      } else {
        Alert.alert('Sharing not supported');
      }
    } catch (error) {
      console.error('Error opening 360 photo:', error);
      Alert.alert('Error', error.message || 'Failed to open photo.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/delhi3.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Button title="first floor" onPress={handleOpenPhotoSphere} />

        <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => router.push('/adminblock/admin4')}>
            <Image
              source={require('../../assets/images/left.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/adminblock/admin5')}>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/adminblock/admin2')}>
            <Image
              source={require('../../assets/images/down.png')}
              style={styles.arrow}
            />
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
});
