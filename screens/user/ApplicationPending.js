// screens/user/ApplicationPending.js
import React from 'react';
import { View, Text } from 'react-native';

export default function ApplicationPending() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your membership is being reviewed ⏳</Text>
    </View>
  );
}
