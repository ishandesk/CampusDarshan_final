import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDecay,
  withTiming,
} from "react-native-reanimated";

// Custom clamp function (since `clamp` isn't in reanimated)
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const { width, height } = Dimensions.get("window");

export default function ExploreCampus() {
  const router = useRouter();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const maxScale = 3;
  const minScale = 1;

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const maxOffsetX = (scale.value - 1) * width / 2;
      const maxOffsetY = (scale.value - 1) * height / 2;

      translateX.value = clamp(
        translateX.value + e.changeX,
        -maxOffsetX,
        maxOffsetX
      );
      translateY.value = clamp(
        translateY.value + e.changeY,
        -maxOffsetY,
        maxOffsetY
      );
    })
    .onEnd((e) => {
      const maxOffsetX = (scale.value - 1) * width / 2;
      const maxOffsetY = (scale.value - 1) * height / 2;

      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [-maxOffsetX, maxOffsetX],
      });
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [-maxOffsetY, maxOffsetY],
      });
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const nextScale = clamp(scale.value * e.scale, minScale, maxScale);
      scale.value = nextScale;
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[styles.mapContainer, animatedStyle]}>
            <Image
              source={require("../../assets/images/college1.jpg")}
              style={styles.map}
              resizeMode="cover"
            />

            {/* Buttons for buildings */}
            <TouchableOpacity
              style={[styles.buildingButton, { top: "20%", left: "75%" }]}
              onPress={() => router.push("/minicampus")}
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
              onPress={() => router.push("/adminblock")}
            >
              <Text style={styles.buttonText}>Admin</Text>
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
  },
  mapContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width,
    height,
    position: "absolute",
  },
  buildingButton: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 255, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
