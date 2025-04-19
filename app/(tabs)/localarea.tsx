import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function LocalArea() {
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState('hostel');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) fetchPlaces(search);
  }, [location]);

  const fetchPlaces = async (keyword) => {
    if (!location) return;
    setLoading(true);

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=3000&keyword=${keyword}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await axios.get(url);
      setResults(response.data.results);
    } catch (error) {
      console.error('Places fetch error:', error);
    }

    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    fetchPlaces(text);
  };

  const renderItem = ({ item }) => {
    const openInGoogleMaps = () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        item.name
      )}&query_place_id=${item.place_id}`;
      Linking.openURL(url);
    };

    return (
      <Pressable onPress={openInGoogleMaps} style={styles.card}>
        <Image
          source={
            item.photos?.[0]?.photo_reference
              ? {
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`,
                }
              : require('../../assets/images/campusdarshan.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.placeName}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Nearby</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search: hostel, food, hospital..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#8e2de2" style={{ marginTop: 30 }} />
      ) : results.length === 0 ? (
        <Text style={styles.noResults}>No places found. Try a different search.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: screenWidth * 0.5,
  },
  cardTextContainer: {
    padding: 14,
    backgroundColor: '#fff',
  },
  placeName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#34495e',
  },
  noResults: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 16,
    marginTop: 40,
  },
});
