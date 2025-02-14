import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?cs=srgb&dl=pexels-pixabay-159490.jpg&fm=jpg' }} 
      style={styles.background} 
      resizeMode="cover"
    >
      {/* Gradient Overlay for Better Readability */}
      <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.2)"]} style={styles.overlay}>
        <View style={styles.header}>
          <Ionicons name="location-outline" size={28} color="white" />
          <Text style={styles.headerText}>NIT Delhi</Text>
        </View>

        {/* Title & Subtitle */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Campus Darshan</Text>
          <Text style={styles.subtitle}>Explore your campus like never before!</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/login")}>
            <Text style={styles.buttonText}>Start Virtual Tour</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/explore")}>
            <Text style={styles.secondaryButtonText}>Explore More</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
  },
  content: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#E0E0E0",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
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
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ffffff",
    width: "80%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
