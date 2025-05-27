// screens/user/RegisterProfessionalScreen.js

import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet,
  ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, app } from '../../src/config/firebaseConfig';

export default function RegisterProfessionalScreen({ navigation }) {
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!specialty || !experience || !phone || !locationName) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    try {
      setLoading(true);
      const ref = doc(db, 'users', user.uid);
      await updateDoc(ref, {
        specialty,
        experience,
        phone,
        locationName,
        applicationStatus: 'pending',
        appliedForMembership: true,
        isProfessional: false
      });

      Alert.alert('✅ Sent', 'Your application has been submitted.');
      navigation.replace('ApplicationPending');
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Apply as a Professional</Text>

      <TextInput
        style={styles.input}
        placeholder="Specialty (e.g. Electrician)"
        value={specialty}
        onChangeText={setSpecialty}
      />
      <TextInput
        style={styles.input}
        placeholder="Years of Experience"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Work Area (e.g. Palermo, CABA)"
        value={locationName}
        onChangeText={setLocationName}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#439751" />
      ) : (
        <View style={styles.button}>
          <Button title="Send Application" onPress={handleSubmit} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#439751',
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});
