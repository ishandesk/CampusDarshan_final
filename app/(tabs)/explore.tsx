import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ExploreMoreScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://www.collegebatch.com/static/clg-gallery/national-institute-of-technology-new-delhi-309739.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.3)"]} style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
  

          <View style={styles.content}>
            <Text style={styles.title}>Discover More About NIT Delhi</Text>
            <Text style={styles.subtitle}>
              Learn about events, campus facilities, and much more!
            </Text>
          </View>

          {/* Cards Section */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Ionicons name="calendar-outline" size={40} color="#4CAF50" />
              <Text style={styles.cardTitle}>Upcoming Events</Text>
              <Text style={styles.cardText}>
                Stay updated with the latest events happening on campus.
              </Text>
            </View>

            <View style={styles.card}>
              <Ionicons name="library-outline" size={40} color="#FF9800" />
              <Text style={styles.cardTitle}>Campus Facilities</Text>
              <Text style={styles.cardText}>
                Explore libraries, labs, and recreational areas.
              </Text>
            </View>

            <View style={styles.card}>
              <Ionicons name="people-outline" size={40} color="#03A9F4" />
              <Text style={styles.cardTitle}>Student Life</Text>
              <Text style={styles.cardText}>
                Dive into the vibrant student community and activities.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 60,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 10,
  },
  content: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#E0E0E0",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    marginBottom: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
});
