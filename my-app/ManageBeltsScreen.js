import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ManageBeltsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Ceintures</Text>
      <Text style={styles.info}>Fonctionnalité à venir...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 10,
  },
  info: { fontSize: 16, color: "#666" },
});
