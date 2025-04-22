import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native"; 
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ChooseRoleScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8faf8" />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>SmartCow Tracker</Text>
          <Text style={styles.subtitle}>Select your role to continue</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.adminButton]}
            onPress={() => navigation.navigate("AdminLogin")}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <View style={styles.iconCircle}>
                <MaterialIcons
                  name="admin-panel-settings"
                  size={28}
                  color="#1b5e20"
                />
              </View>
              <Text style={styles.buttonText}>Administrator</Text>
              <Text style={styles.buttonDescription}>
                Farm management & system control
              </Text>
              <View style={styles.arrowIcon}>
                <MaterialIcons name="arrow-forward" size={20} color="#1b5e20" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.userButton]}
            onPress={() => navigation.navigate("UserLogin")}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.iconCircle, styles.userIconCircle]}>
                <MaterialIcons name="people-alt" size={28} color="#2e7d32" />
              </View>
              <Text style={[styles.buttonText, styles.userButtonText]}>
                User
              </Text>
              <Text
                style={[styles.buttonDescription, styles.userButtonDescription]}
              >
                Cattle monitoring & tracking
              </Text>
              <View style={styles.arrowIcon}>
                <MaterialIcons name="arrow-forward" size={20} color="#2e7d32" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2025 Smart Cattle Monitoring System
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8faf8",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 100,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
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
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#689f38",
    textAlign: "center",
    fontWeight: "500",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 24,
    marginTop: 20,
  },
  button: {
    width: width * 0.85,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#1b5e20",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderTopWidth: 4,
    position: "relative",
  },
  adminButton: {
    borderTopColor: "#1b5e20",
  },
  userButton: {
    borderTopColor: "#4caf50",
  },
  buttonContent: {
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#c8e6c9",
  },
  userIconCircle: {
    backgroundColor: "#f1f8e9",
    borderColor: "#dcedc8",
  },
  buttonText: {
    color: "#1b5e20",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  userButtonText: {
    color: "#2e7d32",
  },
  buttonDescription: {
    color: "#616161",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "80%",
  },
  userButtonDescription: {
    color: "#757575",
  },
  arrowIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    marginTop: -10,
  },
  footerContainer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    textAlign: "center",
    color: "#81c784",
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
