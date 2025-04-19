import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export default function AdminBlock() {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const htmlAsset = Asset.fromModule(require('../../assets/html/viewer.html'));
        const imageAsset = Asset.fromModule(require('../../assets/images/three.jpg'));

        await htmlAsset.downloadAsync();
        await imageAsset.downloadAsync();

        const base64 = await FileSystem.readAsStringAsync(imageAsset.localUri!, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const htmlContent = await FileSystem.readAsStringAsync(htmlAsset.localUri!);
        const updatedHtml = htmlContent.replace('###BASE64_IMAGE_HERE###', `data:image/jpeg;base64,${base64}`);

        const localPath = FileSystem.cacheDirectory + 'viewer.html';
        await FileSystem.writeAsStringAsync(localPath, updatedHtml);

        setHtml(localPath);
      } catch (err) {
        console.error('Failed to load 360 viewer:', err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {html ? (
        <WebView
          source={{ uri: html }}
          style={{ flex: 1 }}
          javaScriptEnabled
          originWhitelist={['*']}
          domStorageEnabled
          allowFileAccess
          allowFileAccessFromFileURLs
          allowsInlineMediaPlayback
          mixedContentMode="always"
        />
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
