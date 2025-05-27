// screens/user/BecomeMemberScreen.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/context/AuthContext';
import { db } from '../../src/config/firebaseConfig';

export default function BecomeMemberScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubscribePress = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      if (userData.applicationStatus === 'pending') {
        Alert.alert('⏳ Application Pending', 'Your application is being reviewed.');
      } else if (userData.applicationStatus === 'approved' && !userData.isProfessional) {
        Alert.alert('✅ Approved', 'Your account will be upgraded soon.');
      } else {
        navigation.navigate('RegisterProfessional');
      }
    } catch (err) {
      console.error('Error checking membership status:', err);
      Alert.alert('Error', 'Could not check your status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Become a FIXO Member</Text>
      <Text style={styles.subtitle}>Enjoy these exclusive benefits:</Text>

      {[
        { icon: 'check-circle', text: 'Priority Support' },
        { icon: 'map-marker', text: 'Featured on the Map' },
        { icon: 'users', text: 'Access to Pro Community' },
        { icon: 'star', text: 'Higher Search Ranking' },
      ].map((item, index) => (
        <View key={index} style={styles.benefitRow}>
          <FontAwesome name={item.icon} size={20} color="#1E88E5" />
          <Text style={styles.benefitText}>{item.text}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubscribePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Subscribe Now</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFF',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backText: {
    marginTop: 20,
    fontSize: 16,
    color: '#1E88E5',
  },
});
