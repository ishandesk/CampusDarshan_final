import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationContainerRef } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./index";
import ExploreScreen from "./explore";

const Tab = createBottomTabNavigator();

export default function Layout() {
  const navigationRef = useNavigationContainerRef();

  return (
    <>
      {/* Stack Navigator (For future screens like Profile, Settings, etc.) */}
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Bottom Tab Navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Explore") iconName = "compass";
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
      </Tab.Navigator>
    </>
  );
}
