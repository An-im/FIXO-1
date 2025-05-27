import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import WelcomeScreen from '../../screens/auth/WelcomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignUpScreen from '../../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import ApplicationPending from '../../screens/user/ApplicationPending';
import UserStackNavigator from './UserStackNavigator';
import AdminStackNavigator from './AdminStackNavigator'; // ✅ este es nuevo
import ProfessionalDashboard from '../../screens/professional/ProfessionalDashboard';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const { role, loading } = useAuth();

  if (loading) return null;

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
          <Stack.Screen name="User" component={UserStackNavigator} />
        ) : role === 'professional' ? (
          <Stack.Screen name="Professional" component={ProfessionalDashboard} />
        ) : role === 'pending' ? (
          <Stack.Screen name="ApplicationPending" component={ApplicationPending} />
        ) : role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminStackNavigator} /> 
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
