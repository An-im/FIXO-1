import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// 👇 Acá irán tus pantallas reales
import WelcomeScreen from '../../screens/auth/WelcomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import ApplicationPending from '../../screens/user/ApplicationPending';
import UserNavigator from './UserNavigator'; // lo vas a crear después
import AdminHome from '../../screens/admin/AdminHome';
import ProfessionalDashboard from '../../screens/professional/ProfessionalDashboard';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const { user, role, loading } = useAuth();

  if (loading) return null; // 🕒 Podés reemplazar por un SplashScreen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {role === 'guest' ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : role === 'user' ? (
          <Stack.Screen name="User" component={UserNavigator} />
        ) : role === 'professional' ? (
          <Stack.Screen name="Professional" component={ProfessionalDashboard} />
        ) : role === 'pending' ? (
          <Stack.Screen name="ApplicationPending" component={ApplicationPending} />
        ) : role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminHome} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
