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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/screens/processing");
    });
    return unsubscribe;
  }, []);

  const handleSignup = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Registered Successfully!", [
        { text: "OK", onPress: () => router.replace("/screens/processing") },
      ]);
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
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

          <Text style={styles.title}>Join Us!</Text>
          <Text style={styles.subtitle}>Create your account</Text>

          <View style={styles.inputContainer}>
            {/* Name */}
            <View style={styles.iconInputWrapper}>
              <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Phone */}
            <View style={styles.iconInputWrapper}>
              <Ionicons name="call-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Email */}
            <View style={styles.iconInputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
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

            {/* Confirm Password */}
            <View style={styles.iconInputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.iconInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#888" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={styles.loginLink}>Login</Text>
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
  signupButton: {
    backgroundColor: "#8e2de2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    marginTop: 16,
    textAlign: "center",
    color: "#000",
  },
  loginLink: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
});
