import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function ProfessionalDashboard() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Professional Dashboard 🛠️</Text>

      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

