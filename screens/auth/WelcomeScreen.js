import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      blurRadius={3}
    >
      <Animated.View
        style={[
          styles.textContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.welcomeText}>WELCOME TO</Text>
        <Image source={require("../../assets/FIXO_logo.png")} style={styles.logo} />
        <Image source={require("../../assets/deco.png")} style={styles.deco} />
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: fadeAnim, transform: [{ translateY: buttonAnim }] },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={[styles.buttonText, styles.signUpButtonText]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  textContainer: {
    position: "absolute",
    top: "18%",
    width: "85%",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: 300,
    height: 160,
    marginBottom: 10,
    resizeMode: "contain",
  },
  deco: {
    width: 280,
    height: 140,
    resizeMode: "contain",
    marginBottom: -240,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "10%",
    width: "85%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#439751",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 12,
    width: "85%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  signUpButton: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#439751",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#FFF",
  },
  signUpButtonText: {
    color: "#439751",
  },
});
