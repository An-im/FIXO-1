import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
  ScrollView, ImageBackground, Alert, ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../src/context/AuthContext';
import { db } from '../../src/config/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { app } from '../../src/config/firebaseConfig';

export default function AccountScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);

          const thumbnail = data.photoURL?.includes("profileImages/")
            ? data.photoURL.replace("profileImages/", "profileImages/thumbs_300x300/")
            : data.photoURL;

          await Image.prefetch(thumbnail);
          setImageURL(thumbnail);
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleLogout = () => {
    const auth = getAuth(app);
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#439751" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      blurRadius={2}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 👤 Profile */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate('PersonalInformationScreen')}
        >
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImage}>
              <ActivityIndicator size="small" color="#FFF" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{userData?.fullName || 'Unnamed'}</Text>
            <Text style={styles.profileSubtext}>{userData?.email}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* ⚙️ Opciones */}
        <View style={styles.optionsContainer}>
          {[
            { icon: 'bell', text: 'Notifications', screen: 'Notifications' },
            { icon: 'info-circle', text: 'Help', screen: 'Help' },
            { icon: 'ticket', text: 'Vouchers', screen: 'Vouchers' },
            { icon: 'lock', text: 'Privacy Settings', screen: 'PrivacySettings' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => navigation.navigate(item.screen)}
            >
              <FontAwesome name={item.icon} size={22} color="#1E88E5" />
              <Text style={styles.optionText}>{item.text}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 🌟 Membership */}
        {userData && !userData.isProfessional && (
          <TouchableOpacity
            style={styles.membershipCard}
            onPress={() => {
              if (userData.applicationStatus === 'pending') {
                Alert.alert('⏳ Pending', 'Your application is being reviewed.');
              } else {
                navigation.navigate('BecomeMember');
              }
            }}
          >
            <FontAwesome name="star" size={22} color="#FFD700" />
            <Text style={styles.membershipText}>Become a FIXO member</Text>
          </TouchableOpacity>
        )}

        {/* 🚪 Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color="#D32F2F" />
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ✅ Reutilizamos tus estilos previos acá...
  background: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: { flex: 1, marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#222' },
  profileSubtext: { fontSize: 13, color: '#777', marginTop: 2 },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#333', marginLeft: 15 },
  membershipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 25,
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
  },
  membershipText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D32F2F',
    marginLeft: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
