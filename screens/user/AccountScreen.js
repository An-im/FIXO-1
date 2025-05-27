import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function UserHistoryScreen({ navigation }) {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AccountScreen 📜</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 20,
          backgroundColor: '#D32F2F',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
