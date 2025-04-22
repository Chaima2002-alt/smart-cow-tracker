"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Sample data for farmers
const FARMERS = [
  {
    id: "1",
    name: "Jean Dupont",
    location: "Bordeaux, France",
    animals: 45,
    belts: 12,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Marie Laurent",
    location: "Lyon, France",
    animals: 78,
    belts: 24,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Pierre Martin",
    location: "Toulouse, France",
    animals: 32,
    belts: 8,
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: "4",
    name: "Sophie Dubois",
    location: "Marseille, France",
    animals: 56,
    belts: 15,
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: "5",
    name: "Thomas Leroy",
    location: "Nantes, France",
    animals: 64,
    belts: 18,
    image: "https://randomuser.me/api/portraits/men/91.jpg",
  },
];

export default function FarmerListScreen() {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderFarmerItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.farmerCard}>
        <TouchableOpacity
          style={styles.farmerCardContent}
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <Image source={{ uri: item.image }} style={styles.farmerImage} />

          <View style={styles.farmerInfo}>
            <Text style={styles.farmerName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Feather
                name="map-pin"
                size={12}
                color="#666"
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Feather name="users" size={12} color="#4CAF50" />
                <Text style={styles.statText}>{item.animals} animaux</Text>
              </View>
              <View style={styles.statItem}>
                <Feather name="box" size={12} color="#FF9800" />
                <Text style={styles.statText}>{item.belts} ceintures</Text>
              </View>
            </View>
          </View>

          <View style={styles.expandIconContainer}>
            <MaterialIcons
              name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="#2e7d32"
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("FarmerDetails", { farmerId: item.id })
              }
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#E3F2FD" },
                ]}
              >
                <Feather name="eye" size={16} color="#2196F3" />
              </View>
              <Text style={styles.actionText}>Voir détails</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("EditFarmer", { farmerId: item.id })
              }
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#E8F5E9" },
                ]}
              >
                <Feather name="edit-2" size={16} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>Modifier</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                // Handle delete action
                Alert.alert(`Supprimer ${item.name}?`);
              }}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: "#FFEBEE" },
                ]}
              >
                <Feather name="trash-2" size={16} color="#F44336" />
              </View>
              <Text style={styles.actionText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FFF8" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2e7d32" />
        </TouchableOpacity>
        <Text style={styles.title}>Liste des Éleveurs</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="#2e7d32" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather
            name="search"
            size={18}
            color="#666"
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>Rechercher un éleveur...</Text>
        </View>
      </View>

      <FlatList
        data={FARMERS}
        renderItem={renderFarmerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddFarmer")}
      >
        <LinearGradient
          colors={["#4CAF50", "#2e7d32"]}
          style={styles.addButtonGradient}
        >
          <AntDesign name="plus" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FFF8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F5E9",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: "#999",
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Extra space for the FAB
  },
  farmerCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  farmerCardContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  farmerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  expandIconContainer: {
    padding: 4,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
