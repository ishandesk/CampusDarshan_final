import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "508408488262-kkhr40eoksuf1tnffhvrqtmg63ual5v0.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@your-username/your-app-slug",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/screens/dashboard"); // Redirect to Dashboard after successful login
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Google Login Successful!", [
            { text: "OK", onPress: () => router.replace("/screens/dashboard") }, // Redirect to Dashboard after successful login
          ]);
        })
        .catch((error) => Alert.alert("Google Sign-In Error", error.message));
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Login Successful!", [
        { text: "OK", onPress: () => router.replace("/screens/dashboard") }, // Redirect to Dashboard after successful login
      ]);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Campus Darshan</Text>
        <Text style={styles.subtitle}>Welcome Back!</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
          <Ionicons name="logo-google" size={20} color="white" />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "85%",
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#7F8C8D",
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
  },
  button: {
    backgroundColor: "#2980B9",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
    elevation: 5,
  },
  googleButton: {
    backgroundColor: "#DB4437",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 50,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  link: {
    marginTop: 20,
    color: "#2980B9",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
