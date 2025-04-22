import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getFarmerById } from "./farmer-data";

const { width } = Dimensions.get("window");
const cardWidth = width > 600 ? width / 3 - 30 : width / 2 - 24;

export default function FarmerDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get the farmerId from route params, default to "1" if not provided
  const farmerId = route.params?.farmerId || "1";

  // Get the farmer details based on the ID
  const farmer = getFarmerById(farmerId);

  // If farmer not found, show a message or navigate back
  if (!farmer) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />
        <LinearGradient colors={["#4CAF50", "#2e7d32"]} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Détails de l'Éleveur</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Éleveur non trouvé</Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackText}>Retourner à la liste</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />

      {/* Header with gradient background */}
      <LinearGradient colors={["#4CAF50", "#2e7d32"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails de l'Éleveur</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("EditFarmer", { farmerId: farmer.id })
          }
        >
          <Feather name="edit-2" size={20} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Farmer Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: farmer.image }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.farmerName}>{farmer.name}</Text>
              <View style={styles.locationContainer}>
                <Feather
                  name="map-pin"
                  size={14}
                  color="#666"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{farmer.location}</Text>
              </View>
              <View style={styles.contactContainer}>
                <Feather
                  name="phone"
                  size={14}
                  color="#666"
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{farmer.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.farmInfoContainer}>
            <Text style={styles.sectionTitle}>Informations de la Ferme</Text>
            <Text style={styles.farmName}>{farmer.farm.name}</Text>
            <View style={styles.farmDetailRow}>
              <Feather
                name="home"
                size={14}
                color="#666"
                style={styles.infoIcon}
              />
              <Text style={styles.farmDetailText}>{farmer.farm.size}</Text>
            </View>
            <View style={styles.farmDetailRow}>
              <Feather
                name="map"
                size={14}
                color="#666"
                style={styles.infoIcon}
              />
              <Text style={styles.farmDetailText}>{farmer.farm.address}</Text>
            </View>
            <View style={styles.memberSinceContainer}>
              <Text style={styles.memberSinceText}>
                Membre depuis {farmer.joinDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#E8F5E9" }]}
            >
              <FontAwesome5 name="cow" size={18} color="#4CAF50" solid />
            </View>
            <Text style={styles.statValue}>{farmer.stats.animals}</Text>
            <Text style={styles.statLabel}>Animaux</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#FFF3E0" }]}
            >
              <Feather name="box" size={18} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{farmer.stats.belts}</Text>
            <Text style={styles.statLabel}>Ceintures</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#E3F2FD" }]}
            >
              <Feather name="activity" size={18} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>
              {farmer.stats.activeMonitoring}
            </Text>
            <Text style={styles.statLabel}>Actifs</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconCircle, { backgroundColor: "#FFEBEE" }]}
            >
              <Feather name="alert-circle" size={18} color="#F44336" />
            </View>
            <Text style={styles.statValue}>{farmer.stats.healthAlerts}</Text>
            <Text style={styles.statLabel}>Alertes</Text>
          </View>
        </View>

        {/* Farm Location Map Placeholder */}
        <Text style={styles.sectionTitle}>Localisation</Text>
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${farmer.farm.coordinates.lat},${farmer.farm.coordinates.lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C${farmer.farm.coordinates.lat},${farmer.farm.coordinates.lng}&key=YOUR_API_KEY`,
            }}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapPlaceholderText}>Carte de la ferme</Text>
          </View>
        </View>

        {/* Performance Metrics */}
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.performanceCard}>
          <View style={styles.performanceRow}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Santé</Text>
              <View style={styles.performanceValueContainer}>
                <Text style={styles.performanceValue}>
                  {farmer.performance.healthScore}
                </Text>
                <Text style={styles.performanceUnit}>/100</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${farmer.performance.healthScore}%`,
                      backgroundColor: "#4CAF50",
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Reproduction</Text>
              <View style={styles.performanceValueContainer}>
                <Text style={styles.performanceValue}>
                  {farmer.performance.reproductionRate}
                </Text>
                <Text style={styles.performanceUnit}>/100</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${farmer.performance.reproductionRate}%`,
                      backgroundColor: "#2196F3",
                    },
                  ]}
                />
              </View>
            </View>
          </View>
          <View style={styles.performanceRow}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Alimentation</Text>
              <View style={styles.performanceValueContainer}>
                <Text style={styles.performanceValue}>
                  {farmer.performance.feedEfficiency}
                </Text>
                <Text style={styles.performanceUnit}>/100</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${farmer.performance.feedEfficiency}%`,
                      backgroundColor: "#FF9800",
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Note Globale</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialIcons
                    key={star}
                    name={
                      star <= farmer.performance.overallRating
                        ? "star"
                        : star <= farmer.performance.overallRating + 0.5
                        ? "star-half"
                        : "star-border"
                    }
                    size={20}
                    color="#FFC107"
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Activité Récente</Text>
          <View style={styles.activityCard}>
            {farmer.recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <Feather name={activity.icon} size={16} color="#2e7d32" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Animals List */}
        <View style={styles.animalsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Animaux</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tous</Text>
              <MaterialIcons name="chevron-right" size={16} color="#2e7d32" />
            </TouchableOpacity>
          </View>

          <View style={styles.animalsCard}>
            {farmer.animals.map((animal) => (
              <View key={animal.id} style={styles.animalItem}>
                <View style={styles.animalIconContainer}>
                  <FontAwesome5 name="cow" size={16} color="#2e7d32" solid />
                </View>
                <View style={styles.animalInfo}>
                  <Text style={styles.animalTag}>{animal.tag}</Text>
                  <Text style={styles.animalDetails}>
                    {animal.type} • {animal.age}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        animal.status === "Sain" ? "#E8F5E9" : "#FFF3E0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: animal.status === "Sain" ? "#4CAF50" : "#FF9800",
                      },
                    ]}
                  >
                    {animal.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() =>
              navigation.navigate("ManageBelts", { farmerId: farmer.id })
            }
          >
            <Feather
              name="settings"
              size={18}
              color="white"
              style={styles.actionButtonIcon}
            />
            <Text style={styles.primaryButtonText}>Gérer les Ceintures</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() =>
              navigation.navigate("ContactFarmer", { farmerId: farmer.id })
            }
          >
            <Feather
              name="message-circle"
              size={18}
              color="#2e7d32"
              style={styles.actionButtonIcon}
            />
            <Text style={styles.secondaryButtonText}>Contacter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  editButton: {
    padding: 8,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  goBackText: {
    color: "white",
    fontWeight: "600",
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 24,
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
  profileHeader: {
    flexDirection: "row",
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  farmerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
  farmInfoContainer: {
    padding: 16,
  },
  farmName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  farmDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  farmDetailText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  memberSinceContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  memberSinceText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  mapContainer: {
    height: 180,
    backgroundColor: "#e1e1e1",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    position: "relative",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  performanceCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  performanceItem: {
    width: "48%",
  },
  performanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  performanceValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 6,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  performanceUnit: {
    fontSize: 12,
    color: "#999",
    marginLeft: 2,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  activitySection: {
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 16,
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
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: "#999",
  },
  animalsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: "#2e7d32",
    marginRight: 4,
  },
  animalsCard: {
    backgroundColor: "white",
    borderRadius: 16,
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
  animalItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  animalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  animalInfo: {
    flex: 1,
  },
  animalTag: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  animalDetails: {
    fontSize: 12,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  primaryButton: {
    backgroundColor: "#2e7d32",
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2e7d32",
    marginLeft: 8,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  secondaryButtonText: {
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: 14,
  },
});
