"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

export default function AddFarmerScreen() {
  const navigation = useNavigation()

  // Basic information
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Farm information
  const [farmName, setFarmName] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [farmAddress, setFarmAddress] = useState("")

  // Statistics
  const [animals, setAnimals] = useState("")
  const [belts, setBelts] = useState("")

  // Profile image - in a real app, you would use an image picker
  const [profileImage, setProfileImage] = useState("https://randomuser.me/api/portraits/lego/1.jpg")

  const handleAdd = () => {
    // Basic validation
    if (!name || !location || !email || !phone || !farmName || !farmSize || !farmAddress) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email valide.")
      return
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s]{10,15}$/
    if (!phoneRegex.test(phone)) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide.")
      return
    }

    // In a real app, you would save the farmer data to a database
    Alert.alert("Succès", `Éleveur ${name} ajouté avec succès !`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("FarmerList"),
      },
    ])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />

      {/* Header with gradient background */}
      <LinearGradient colors={["#4CAF50", "#2e7d32"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un Éleveur</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity style={styles.changeImageButton}>
            <Feather name="camera" size={18} color="white" />
            <Text style={styles.changeImageText}>Changer la photo</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Personnelles</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="user" size={18} color="#2e7d32" />
            </View>
            <TextInput style={styles.input} placeholder="Nom complet" value={name} onChangeText={setName} />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="map-pin" size={18} color="#2e7d32" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Localisation (ville, pays)"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="mail" size={18} color="#2e7d32" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="phone" size={18} color="#2e7d32" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Farm Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de la Ferme</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="home" size={18} color="#2e7d32" />
            </View>
            <TextInput style={styles.input} placeholder="Nom de la ferme" value={farmName} onChangeText={setFarmName} />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="maximize" size={18} color="#2e7d32" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Taille (hectares)"
              value={farmSize}
              onChangeText={setFarmSize}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIconContainer}>
              <Feather name="map" size={18} color="#2e7d32" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Adresse complète"
              value={farmAddress}
              onChangeText={setFarmAddress}
              multiline
            />
          </View>
        </View>

        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques Initiales</Text>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <View style={styles.inputIconContainer}>
                <FontAwesome5 name="cow" size={16} color="#2e7d32" solid />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nombre d'animaux"
                value={animals}
                onChangeText={setAnimals}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfInput]}>
              <View style={styles.inputIconContainer}>
                <Feather name="box" size={18} color="#2e7d32" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Nombre de ceintures"
                value={belts}
                onChangeText={setBelts}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes Additionnelles</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes ou informations supplémentaires..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
          <LinearGradient colors={["#4CAF50", "#2e7d32"]} style={styles.submitButtonGradient}>
            <Text style={styles.submitButtonText}>Ajouter l'Éleveur</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
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
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#E8F5E9",
  },
  changeImageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  changeImageText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  inputIconContainer: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  submitButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
