import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserNavigator from './UserNavigator';
import BecomeMemberScreen from '../../screens/user/BecomeMemberScreen';
import PersonalInformationScreen from '../../screens/user/PersonalInformationScreen';
import RegisterProfessionalScreen from '../../screens/user/RegisterProfessionalScreen';
const Stack = createNativeStackNavigator();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={UserNavigator} />
      <Stack.Screen name="BecomeMember" component={BecomeMemberScreen} />
      <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationScreen} />
      <Stack.Screen name="RegisterProfessional" component={RegisterProfessionalScreen} />

    </Stack.Navigator>
  );
}
