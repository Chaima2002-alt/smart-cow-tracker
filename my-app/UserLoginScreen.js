import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function UserLoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Ajout du password
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "307711503944-tgq6uci6k5n99ir3it870lps890m9p2o.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@ton_nom_utilisateur/ton_projet", // à personnaliser
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  async function fetchUserInfo(token) {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    setUserInfo(user);
    navigation.navigate("UserDashboard"); // Redirection après login Google
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Connexion réussie :", user.email);
      navigation.navigate("UserDashboard");
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      Alert.alert("Erreur", error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert(
        "Email Required",
        "Please enter your email address to reset your password."
      );
      return;
    }
    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${email}.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)} // Ajout du gestionnaire de changement
        />
        <TouchableOpacity style={styles.eyeButton} onPress={toggleShowPassword}>
          <Image
            source={
              showPassword
                ? require("./assets/eye-circle.png")
                : require("./assets/eye-off.png")
            }
            style={styles.eye}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleForgotPassword}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login with</Text>

      {userInfo ? (
        <Text style={styles.welcomeText}>Welcome, {userInfo.name}!</Text>
      ) : (
        <TouchableOpacity
          style={styles.googleButton}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Image
            source={require("./assets/google.png")}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
      )}

      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles identiques à ton code précédent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8faf8",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 30,
  },
  input: {
    width: "95%",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#228B22",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 35,
    width: "70%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#228B22",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: "#555",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 35,
    width: "70%",
    justifyContent: "center",
    marginBottom: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006400",
    marginTop: 10,
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpText: {
    color: "#228B22",
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  eye: {
    width: 24,
    height: 24,
  },
});
