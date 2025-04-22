import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo et titre */}
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>SmartCow Tracker</Text>
      <Text style={styles.subtitle}>Monitor your cows in real-time</Text>

      {/* Description additionnelle */}
      <Text style={styles.description}>
        Our app provides real-time monitoring of your cows, ensuring their
        safety and well-being. Track their location, health status, and receive
        alerts for any unusual activity.
      </Text>

      {/* Bouton "Get Started" */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChooseRole")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          © 2025 Smart Cattle Monitoring System
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f5e9", // Lighter, more modern green background
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 75, // Make logo circular
    borderWidth: 4,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Chivo-VariableFont_wght",
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    color: "#558b59", // Medium green for better readability
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.25,
  },
  description: {
    fontSize: 16,
    lineHeight: 24, // Improved line height for readability
    color: "#555", // Darker text for better contrast
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
    fontFamily: "MPLUSRounded1c-Regular",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#2e7d32", // Darker green for better contrast
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#2e7d32", // Darker border for depth
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase", // Makes text all caps for emphasis
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingTop: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 100, 0, 0.2)",
  },
  footerText: {
    textAlign: "center",
    color: "#558b59",
    fontSize: 12,
    letterSpacing: 0.5,
    fontStyle: "italic",
  },
});