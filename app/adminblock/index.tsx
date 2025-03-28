import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from "react-native";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function AdminBlock() {
  const [modalVisible, setModalVisible] = useState(false);

  // Shared values for smooth panning in X and Y directions
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gesture for 360-degree movement
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX; // Move horizontally
      translateY.value = event.translationY; // Move vertically
    })
    .onEnd(() => {
      translateX.value = withSpring(0); // Reset X-axis smoothly
      translateY.value = withSpring(0); // Reset Y-axis smoothly
    });

  // Animated style for moving background image
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Gesture Detector for 360-degree Panning */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.backgroundContainer, animatedStyle]}>
            <Image 
              source={require("../../assets/images/admin.jpg")} 
              style={styles.backgroundImage} 
              resizeMode="cover" 
            />
          </Animated.View>
        </GestureDetector>

        {/* About Section Button */}
        <TouchableOpacity 
          style={styles.aboutButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.aboutText}>About Admin Block</Text>
        </TouchableOpacity>

        {/* About Admin Block Modal */}
        <Modal 
          animationType="fade" 
          transparent={true} 
          visible={modalVisible} 
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>🏛 Admin Block</Text>
              <Text style={styles.modalText}>
                The **Admin Block** is the core of the institution’s management and administration.
                It houses various offices, including the **Director’s office, administrative departments,
                and student services.**
              </Text>
              <Text style={styles.modalSubtitle}>Facilities:</Text>
              <Text style={styles.modalList}>• Director’s Office</Text>
              <Text style={styles.modalList}>• Examination Cell</Text>
              <Text style={styles.modalList}>• Faculty & Staff Offices</Text>
              <Text style={styles.modalList}>• Conference Rooms</Text>
              <Text style={styles.modalList}>• Student Helpdesk</Text>

              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    width: width * 2, // Make the image twice as wide for better scrolling effect
    height: height * 2, // Allow movement in both directions
    position: "absolute",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  aboutButton: {
    position: "absolute",
    top: 50,
    left: "50%", // Center horizontally
    transform: [{ translateX: -90 }], // Adjust for button width to center
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    zIndex: 1, // Ensure button is above the image
  },
  aboutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2C3E50",
  },
  modalText: {
    fontSize: 16,
    textAlign: "justify",
    color: "#555",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#2C3E50",
  },
  modalList: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

