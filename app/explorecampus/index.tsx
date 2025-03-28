import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

// Get Screen Dimensions
const { width, height } = Dimensions.get("window");

export default function ExploreCampus() {
  const router = useRouter();

  // Zoom & Pan Shared Values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesture Handling
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    scale.value = event.scale; // Keep zoom level
  });

  const panGesture = Gesture.Pan().onUpdate((event) => {
    translateX.value = event.translationX;
    translateY.value = event.translationY;
  });

  // Animated Styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={Gesture.Simultaneous(pinchGesture, panGesture)}>
          <Animated.View style={[styles.mapContainer, animatedStyle]}>
            {/* Full-Screen Image */}
            <Image source={require("../../assets/images/college1.jpg")} style={styles.map} resizeMode="cover" />

            {/* Clickable Buildings */}
            <TouchableOpacity
              style={[styles.buildingButton, { top: "30%", left: "40%" }]}
              onPress={() => router.push("/building-details/1")}
            >
              <Text style={styles.buttonText}>Mini Campus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buildingButton, { top: "50%", left: "60%" }]}
              onPress={() => router.push("/building-details/2")}
            >
              <Text style={styles.buttonText}>Ground</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buildingButton, { top: "70%", left: "20%" }]}
              onPress={() => router.push('/adminblock')}
            >
              <Text style={styles.buttonText}>Admin Block</Text>
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: width, // Full width
    height: height, // Full height
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: width, // Full width
    height: height, // Full height
    position: "absolute",
  },
  buildingButton: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 255, 0.7)", // Semi-transparent blue
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
