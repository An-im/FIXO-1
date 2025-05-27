import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../src/config/firebaseConfig';

export default function AdminHome() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          try {
            const auth = getAuth(app);
            await signOut(auth);
            // No navegues manualmente, MainNavigator lo hace por vos
          } catch (err) {
            console.error('Logout error:', err);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Admin 👑</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminApplications')}
      >
        <Text style={styles.buttonText}>📥 View Applications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>🚪 Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
