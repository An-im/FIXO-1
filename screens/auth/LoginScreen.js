// screens/auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ImageBackground, Image, Alert, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      // MainNavigator se encargará del redireccionamiento
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Error', 'User not found.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Incorrect password.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'Invalid email format.');
          break;
        default:
          Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Image source={require('../../assets/FIXO_logo.png')} style={styles.logo} />
              <Text style={styles.title}>Log in</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Forgot your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '100%' },
  logo: { width: 200, height: 100, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderBottomWidth: 2,
    borderColor: '#439751',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 6,
    color: '#333',
  },
  button: {
    backgroundColor: '#439751',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { textAlign: 'center', color: '#1E88E5', marginTop: 10 },
});
