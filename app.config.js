export default {
  expo: {
    name: "campusdarshan",
    slug: "campusdarshan",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "campusdarshan",
    userInterfaceStyle: "automatic",
    plugins: ["expo-router"],
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourname.campusdarshan", // ✅ Replace with real iOS ID
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.yourname.campusdarshan", // ✅ Replace with real Android package
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    experiments: {
      typedRoutes: true,
    },
    extra: {
      // ✅ Hardcoded values instead of dotenv
      EXPO_PUBLIC_GOOGLE_API_KEY: "YOUR_GOOGLE_API_KEY",
      GEMINI_API_KEY: "YOUR_GEMINI_API_KEY",

      expoClientId: "YOUR_EXPO_CLIENT_ID",
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
      iosClientId: "YOUR_IOS_CLIENT_ID",

      projectId: "your-firebase-project-id",
      eas: {
        projectId: "your-eas-project-id",
      },
    },
  },
};
