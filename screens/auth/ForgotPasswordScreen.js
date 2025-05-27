import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ImageBackground, Image, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      Alert.alert('Oops', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.toLowerCase());
      Alert.alert('✅ Email sent', 'Check your inbox to reset your password.');
      navigation.goBack();
    } catch (error) {
      console.error('Password reset error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.container}>
            <Image source={require('../../assets/FIXO_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Reset Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#439751',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 24,
    color: '#333',
  },
  button: {
    backgroundColor: '#439751',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  backText: { color: '#1E88E5', marginTop: 12 },
});
