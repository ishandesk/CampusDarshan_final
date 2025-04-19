import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated, Easing } from "react-native";
import { useRouter, Stack } from "expo-router";

export default function ProcessingScreen() {
  const router = useRouter();
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the spinning animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      router.replace("/(tabs)/dashboard"); // Replace this with your desired screen
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/campussdarshan.gif")}
          style={[styles.image, { transform: [{ rotate: spin }] }]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
