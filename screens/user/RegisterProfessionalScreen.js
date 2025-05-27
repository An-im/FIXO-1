import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../src/config/firebaseConfig';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterProfessionalScreen({ navigation }) {
  const { user } = useAuth();
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();

        if (data.applicationStatus === 'pending' || data.applicationStatus === 'approved') {
          setAlreadyApplied(true);
        }
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, []);

  const handleSubmit = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        profession,
        experience,
        phone,
        category,
        applicationStatus: 'pending',
        appliedForMembership: true,
        isProfessional: false,
        appliedAt: serverTimestamp(),
      });

      Alert.alert('✅ Sent', 'Your application was submitted.');
      setAlreadyApplied(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      Alert.alert('Error', 'Failed to send application.');
    }
  };

  if (alreadyApplied) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>⏳ Application already sent</Text>
        <Text style={styles.subtitle}>You’ll be notified once reviewed.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply as a Professional</Text>

      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={profession}
        onChangeText={setProfession}
      />
      <TextInput
        style={styles.input}
        placeholder="Years of experience"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Application</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#4CAF50',
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
