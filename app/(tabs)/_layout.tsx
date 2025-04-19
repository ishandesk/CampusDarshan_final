import { Tabs } from 'expo-router';
import { Ionicons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false, // ✅ Hide the top header across all tabs
        tabBarActiveTintColor: '#007bff', // Optional styling
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="localarea"
        options={{
          title: 'Local Area',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="location-pin" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="placements"
        options={{
          title: 'Placements',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="business-center" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="narration"
        options={{
          title: 'Narration',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="headphones" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
