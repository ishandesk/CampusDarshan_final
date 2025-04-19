import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({
      useProxy: true,
    }),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/screens/processing");
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
            { text: "OK", onPress: () => router.replace("/screens/processing") },
          ]);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Google Sign-In Error", error.message);
        });
    }
  }, [response]);

  const handleLogin = async () => {
    if (password.length < 6) {
      setPasswordError("Password is not valid!");
      return;
    }
    setPasswordError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Login Successful!", [
        { text: "OK", onPress: () => router.replace("/screens/processing") },
      ]);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Image
            source={require("../../assets/images/campusdarshan.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue!</Text>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              if (request) {
                promptAsync();
              } else {
                Alert.alert("Error", "Google Sign-In is not available");
              }
            }}
          >
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Log in with Google</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <View style={styles.inputContainer}>
            <View style={styles.iconInputWrapper}>
              <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.iconInputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
              </TouchableOpacity>
            </View>

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forget password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text style={styles.signupText}>
              Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  socialButtonText: {
    fontSize: 15,
    marginLeft: 10,
    color: "#000",
  },
  orText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 4,
  },
  inputContainer: {
    marginTop: 0,
  },
  iconInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  inputIcon: {
    marginRight: 8,
  },
  iconInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#8e2de2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotText: {
    marginTop: 16,
    textAlign: "center",
    color: "#8e2de2",
    fontWeight: "600",
  },
  signupText: {
    marginTop: 10,
    textAlign: "center",
    color: "#000",
  },
  signupLink: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
});
