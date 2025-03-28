import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();
  const collegeLocation = {
    latitude: 28.7496,
    longitude: 77.1187,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{uri: 'https://nitdelhi.ac.in/wp-content/uploads/2024/06/nitd.jpg'}} // Campus-like background image
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>NATIONAL INSTITUTE OF TECHNOLOGY DELHI</Text>
          
          {/* Replacing the Map with an Image */}
          <Image 
            source={{uri: 'https://nitdelhi.ac.in/wp-content/uploads/2024/06/Screenshot-2024-06-01-161400.png'}} // Replace with your satellite or campus map image URL
            style={styles.map}
            resizeMode="contain" // Ensures the image fits within the container
          />
          
          <Pressable 
            style={styles.button} 
            onPress={() => router.push('/explorecampus')} // Link to campus exploration page
          >
            <Text style={styles.buttonText}>Explore Campus</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    opacity: 0.9, // Slight opacity for a soft background
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: '85%',
    height: '85%',
    marginTop: 40, // Adjust to align properly
  },
  title: { 
    fontSize: 32, 
    fontWeight: "800", 
    color: "#fff", 
    marginBottom: 25, 
    textAlign: "center", 
    textShadowColor: '#000', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 12,
    fontFamily: 'Roboto', // Adds a clean, modern font feel
  },
  map: { 
    width: Dimensions.get("window").width * 0.9, 
    height: 280, 
    borderRadius: 20, 
    overflow: "hidden", 
    marginBottom: 40,
  },
  button: { 
    backgroundColor: "#2C3E50", // Campus dark blue shade
    paddingVertical: 18, 
    paddingHorizontal: 40, 
    borderRadius: 12, 
    marginTop: 25, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 6, 
    elevation: 4,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "center", 
    textTransform: "uppercase",
    letterSpacing: 1.5, // Adds spacing between letters for a campus feel
  },
});

export default Dashboard;
