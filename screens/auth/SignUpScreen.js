import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ImageBackground, Image, Alert, ScrollView, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../src/config/firebaseConfig'; // Ajustá si cambia la ruta

const capitalizeFirstLetter = (text) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : '';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+54');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationName, setLocationName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !fullName || !phoneNumber || !locationName) {
      Alert.alert('Oops', 'Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const fullPhone = `${countryCode}${phoneNumber}`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: email.toLowerCase(),
        fullName: capitalizeFirstLetter(fullName),
        phone: fullPhone,
        locationName,
        photoURL: `https://ui-avatars.com/api/?name=${fullName.replace(/ /g, "+")}`,
        isProfessional: false,
        appliedForMembership: false,
        applicationStatus: 'none',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Welcome!', 'Your account was created successfully.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign up error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Image source={require('../../assets/FIXO_logo.png')} style={styles.logo} />
              <Text style={styles.title}>Create Account</Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#666"
                value={fullName}
                onChangeText={(text) => setFullName(capitalizeFirstLetter(text))}
              />

              <View style={styles.phoneRow}>
                <TextInput
                  style={styles.countryCodeInput}
                  placeholder="+54"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  value={countryCode}
                  onChangeText={setCountryCode}
                  maxLength={4}
                />
                <TextInput
                  style={styles.phoneInput}
                  placeholder="11 1234 5678"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#666"
                value={locationName}
                onChangeText={(text) => setLocationName(capitalizeFirstLetter(text))}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#666"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInText}>Already have an account? Log in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#439751',
    marginBottom: 24,
    fontSize: 16,
    color: '#333',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#439751',
  },
  countryCodeInput: {
    width: 60,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#439751',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },
});
