import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHome from '../../screens/admin/AdminHome';
import AdminApplicationsScreen from '../../screens/admin/AdminApplicationsScreen';

const Stack = createStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminApplications" component={AdminApplicationsScreen} />
    </Stack.Navigator>
  );
}
