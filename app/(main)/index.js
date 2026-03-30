import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useContext, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';
import DeviceCard from '../../components/DeviceCard';

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(main)/overview" />;
}

