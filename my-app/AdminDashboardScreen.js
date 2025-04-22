import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Platform,
  } from "react-native"
  import { useNavigation } from "@react-navigation/native"
  import { MaterialIcons, FontAwesome5, Entypo, Feather } from "@expo/vector-icons"
  import { LinearGradient } from "expo-linear-gradient"
  
  const { width } = Dimensions.get("window")
  const cardWidth = width > 600 ? width / 3 - 30 : width / 2 - 24
  
  export default function AdminDashboardScreen() {
    const navigation = useNavigation()
  
    const stats = [
      { label: "Éleveurs", value: "124", icon: "users", color: "#4CAF50" },
      { label: "Ceintures", value: "56", icon: "box", color: "#FF9800" },
    ]
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FFF8" />
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Bonjour, Admin</Text>
              <Text style={styles.title}>Tableau de Bord</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <MaterialIcons name="account-circle" size={40} color="#2e7d32" />
            </TouchableOpacity>
          </View>
  
          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: `${stat.color}20` }]}>
                  <Feather name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
  
          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gestion</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
  
          {/* Cards */}
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("FarmerList")}>
              <LinearGradient colors={["#E8F5E9", "#C8E6C9"]} style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <MaterialIcons name="people" size={32} color="#2e7d32" />
                  </View>
                  <Text style={styles.cardText}>Liste des Éleveurs</Text>
                  <Text style={styles.cardDescription}>Gérer tous les éleveurs</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddFarmer")}>
              <LinearGradient colors={["#E8F5E9", "#C8E6C9"]} style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <FontAwesome5 name="user-plus" size={28} color="#2e7d32" />
                  </View>
                  <Text style={styles.cardText}>Ajouter un Éleveur</Text>
                  <Text style={styles.cardDescription}>Créer un nouveau profil</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ManageBelts")}>
              <LinearGradient colors={["#E8F5E9", "#C8E6C9"]} style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <Entypo name="tools" size={28} color="#2e7d32" />
                  </View>
                  <Text style={styles.cardText}>Gérer les Ceintures</Text>
                  <Text style={styles.cardDescription}>Configurer les appareils</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Settings")}>
              <LinearGradient colors={["#E8F5E9", "#C8E6C9"]} style={styles.cardGradient}>
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <MaterialIcons name="settings" size={30} color="#2e7d32" />
                  </View>
                  <Text style={styles.cardText}>Paramètres</Text>
                  <Text style={styles.cardDescription}>Configurer l'application</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
  
          {/* Recent Activity Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activités Récentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.activityContainer}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  <MaterialIcons name="notifications" size={20} color="#2e7d32" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Nouvel éleveur ajouté</Text>
                  <Text style={styles.activityTime}>Il y a 2 heures</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#2e7d32" />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#F8FFF8",
    },
    container: {
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: "#F8FFF8",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    greeting: {
      fontSize: 16,
      color: "#666",
      marginBottom: 4,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#2e7d32",
    },
    profileButton: {
      padding: 4,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    statCard: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 16,
      width: "48%",
      alignItems: "flex-start",
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
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: "#666",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    seeAllText: {
      fontSize: 14,
      color: "#2e7d32",
    },
    cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    card: {
      width: cardWidth,
      height: 160,
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    cardGradient: {
      flex: 1,
      padding: 16,
    },
    cardContent: {
      flex: 1,
      justifyContent: "space-between",
    },
    cardIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    cardText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#2e7d32",
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 12,
      color: "#666",
    },
    activityContainer: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 8,
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
    activityItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
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
    activityTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
      marginBottom: 2,
    },
    activityTime: {
      fontSize: 12,
      color: "#999",
    },
  })
  