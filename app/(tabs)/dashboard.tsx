import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // Navigates to index.tsx
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Auto-redirect to dashboard if user is not logged out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/"); // Redirect to index if user is logged out
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://nitdelhi.ac.in/wp-content/uploads/2024/06/nitd.jpg",
          }}
          style={styles.backgroundImage}
        >
          {/* Logout Button */}
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </Pressable>

          <View style={styles.overlay}>
            <Text style={styles.title}>
              NATIONAL INSTITUTE OF TECHNOLOGY DELHI
            </Text>

            <Image
              source={{
                uri: "https://nitdelhi.ac.in/wp-content/uploads/2024/06/Screenshot-2024-06-01-161400.png",
              }}
              style={styles.map}
              resizeMode="contain"
            />

            <Pressable
              style={styles.button}
              onPress={() => router.push("/explorecampus")}
            >
              <Text style={styles.buttonText}>Explore Campus</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

// Optional Tab Icon Config
Dashboard.tabs = {
  tabBarIcon: ({ color, size }) => (
    <Ionicons name="compass" size={size} color={color} />
  ),
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    height: "85%",
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 25,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 12,
    fontFamily: "Roboto",
  },
  map: {
    width: Dimensions.get("window").width * 0.9,
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2C3E50",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 25,
    shadowColor: "#000",
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
    letterSpacing: 1.5,
  },
  logoutButton: {
    position: "absolute",
    top: 50,
    right: 25,
    zIndex: 2,
    backgroundColor: "rgba(44, 62, 80, 0.9)",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
});
